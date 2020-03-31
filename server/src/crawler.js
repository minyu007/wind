const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

// const db = require('./db');
const gsamacModel = require('./model/gsamac');
const constants = require('./constants');
const service = require('./service');
const utils = require('./utils');

module.exports = {
  scrape: async () => {
    const today = utils.getToday();
    const month = new Date().getMonth();
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--proxy-server=' + process.env.http_proxy + '',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--lang=en-US',
      ],
      // ,
      // executablePath: '/path/to/Chrome',
    });
    //https://www.urbanoutfitters.com/?localredirected=1&utm_source=localised&utm_medium=urbn_referring

    const page = await browser.newPage();
    page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    );

    page.setViewport({
      width: 1440,
      height: 900,
    });

    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
      if (
        interceptedRequest.resourceType() == 'stylesheet' ||
        interceptedRequest.resourceType() == 'png' ||
        interceptedRequest.resourceType() == 'jpeg'
      ) {
        interceptedRequest.abort();
      } else {
        interceptedRequest.continue();
      }
    });
    await page.authenticate('a534561', '19821013www;;');

    await page.goto(`http://gs.amac.org.cn/amac-infodisc/res/pof/fund/index.html`, {
      timeout: constants.WAIT,
    });

    await service.sleep(7000);

    await page.tap('.layui-layer-btn0');

    await page.type('#keyword', '歌斐', {
      delay: 100,
    });

    await page.tap('.query-btn.button span');

    // await page.waitForSelector('select[name="fundlist_length"]', {
    //   timeout: constants.WAIT,
    // });

    // await page.select('select[name="fundlist_length"]', '100');
    await service.sleep(7000);

    const sumOfPages = await page.evaluate(() => {
      const sum = Array.from(document.querySelectorAll('#fundlist_info')).map(v => v.innerText)[0];
      let arr = sum.split('，');
      let num = arr[1].replace('共', '').replace('页', '');
      return Number.parseInt(num);
    });
    await page.type('#goInput', '82', {
      delay: 100,
    });
    await page.tap('.btn-go');

    await service.sleep(5000);

    utils.log(` ===== total ${sumOfPages} pages ===== `);

    const todo = async () => {
      for (let i = 80, l = sumOfPages - 1; i < l; i++) {
        const fromPage = await page.evaluate(() => {
          const urlArr = Array.from(
            document.querySelectorAll('#fundlist_wrapper tbody tr td:nth-child(2) a')
          ).map(v => v.href);
          return urlArr;
        });
        // console.log(fromPage);

        for (let ii = 0, ll = fromPage.length; ii < ll; ii++) {
          let tab = await browser.newPage();
          tab.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
          );

          tab.setViewport({
            width: 1440,
            height: 900,
          });
          await tab.setRequestInterception(true);
          tab.on('request', interceptedRequest => {
            if (
              interceptedRequest.resourceType() == 'stylesheet' ||
              interceptedRequest.resourceType() == 'png' ||
              interceptedRequest.resourceType() == 'jpeg'
            ) {
              interceptedRequest.abort();
            } else {
              interceptedRequest.continue();
            }
          });
          await tab.authenticate('a534561', '19821013www;;');
          await tab.goto(fromPage[ii], {
            timeout: constants.WAIT,
          });
          await tab.waitForSelector('.close-page', {
            timeout: constants.WAIT,
          });
          const pageData = await tab.evaluate(() => {
            const data = Array.from(
              document.querySelectorAll('.table > tbody > tr > td:nth-child(2)')
            ).map(v => v.innerText);
            return data;
          });
          // console.log(pageData);
          await gsamacModel.gsamac.createData({
            day: today,
            fundName: pageData[0],
            fundCode: pageData[1],
            EstablishedDate: pageData[2],
            FilingDate: pageData[3],
            recodingStage: pageData[4],
            fundType: pageData[5],
            currency: pageData[6],
            fundManager: pageData[7],
            ManagementType: pageData[8],
            custodianName: pageData[9],
            status: pageData[10],
            LastUpdate: pageData[11],
            SpecialTips: pageData[12],
          });

          let timer1 = utils.getRandom(1000 * 3, 1000 * 5);
          utils.log(
            `-- ${pageData[0]} from page  ${i + 1}'s data has been crawled, sleep ${timer1} -- `
          );
          await service.sleep(timer1);
          tab.close();
        }
        utils.log(` ===== page ${i + 1}'s data have been crawled!! ===== `);

        await page.tap('.paginate_button.next');
        await service.sleep(3000);
      }
    };
    await todo();
    await service.createExcel(today);
    utils.log(` ===== all of the data have been crawled successfully!! ===== `);
  },
};
