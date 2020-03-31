const fs = require('fs');
const Excel = require('exceljs');

const XLSXChart = require('xlsx-chart');
const _ = require('lodash');
const excelColumnName = require('excel-column-name');

const gsamacModel = require('./model/gsamac');
const gsamacTransferredModel = require('./model/gsamacTransferred');
const utils = require('./utils');

const service = {
  sleep(ms) {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },

  async createExcelChart(day) {
    const data = await gsamacTransferredModel.gsamacTransferred.getData({
      day,
    });

    let fieldsData = data.map(v => v.EstablishedDateStamp);
    const fields = _.uniq(fieldsData).sort((v1, v2) => {
      return v1 - v2;
    });

    let titlesData = data.map(v => v.fundType);
    // const titles = _.uniq(titlesData).sort((v1, v2) => {
    //   return v1.length - v2.length;
    // });
    const titles = [
      '其他类型',
      '股权投资基金',
      '创业投资基金',
      '其他私募投资基金',
      '私募证券投资基金',
      '歌斐债券型私募证券投资基金',
    ];
    let group = _.groupBy(data, 'fundType');
    let group1 = {};
    for (let key in group) {
      group1[key] = _.groupBy(group[key], 'EstablishedDateStamp');
    }

    let group2 = {};
    for (let key1 in group1) {
      group2[key1] = {
        chart: 'column',
      };
      for (let key2 in group1[key1]) {
        group2[key1][key2] = group1[key1][key2].length;
      }
    }
    // let group3 = group2.sort((v1, v2) => {
    //   return v1 - v2;
    // })
    // console.log(fields, titles, group2);

    const xlsxChart = new XLSXChart();
    // [ '基金专户', '股权投资基金', '私募证券投资基金', '其他私募投资基金', '信托计划', '创业投资基金' ]
    var opts = {
      titles: titles,
      fields: fields,
      data: group2,
      chartTitle: '歌斐数据',
    };
    xlsxChart.generate(opts, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        fs.writeFileSync('columnLine.xlsx', data);
        console.log('columnLine.xlsx created.');
      }
    });
  },

  async createExcel(day) {
    const data = await gsamacModel.gsamac.getData({
      day,
    });

    // const _data = data.map(v => ({
    //   productId: v.productId,
    //   productName: v.productName,
    //   type: v.type,
    //   typeString: v.typeString,
    //   originalPrice: v.originalPrice,
    //   currentPrice: v.currentPrice,
    //   styleNumber: v.styleNumber,
    //   isSoldOut: v.isSoldOut,
    //   createdOn: v.createdOn,
    //   link: v.link,
    //   discount: discount(v.originalPrice, v.currentPrice),
    // }));

    // const group = _.groupBy(_data, 'typeString');

    const workbook = new Excel.Workbook();
    const ws = workbook.addWorksheet('all');

    ws.columns = [
      { header: 'Fund Name', key: 'fundName', width: 60 },
      { header: 'fund Code', key: 'fundCode', width: 20 },
      { header: 'Established Date', key: 'EstablishedDate', width: 20 },
      { header: 'Filing Date', key: 'FilingDate', width: 20 },
      { header: 'Recording Stage', key: 'recodingStage', width: 50 },
      { header: 'Fund Type', key: 'fundType', width: 20 },
      { header: 'Currency', key: 'currency', width: 20 },
      { header: 'Fund Manager', key: 'fundManager', width: 50 },
      { header: 'Management Type', key: 'ManagementType', width: 20 },
      { header: 'Hoster', key: 'custodianName', width: 45 },
      { header: 'status', key: 'status', width: 20 },
      { header: 'Last Update', key: 'LastUpdate', width: 20 },
      { header: 'Special Tips', key: 'SpecialTips', width: 20 },
      { header: 'Scraped on', key: 'day', width: 20 },
    ];
    const font = {
      name: 'Calibri',
      family: 4,
      size: 12,
      bold: true,
    };
    ws.getCell('A1').font = font;
    ws.getCell('B1').font = font;
    ws.getCell('C1').font = font;
    ws.getCell('D1').font = font;
    ws.getCell('E1').font = font;
    ws.getCell('F1').font = font;
    ws.getCell('G1').font = font;
    ws.getCell('H1').font = font;
    ws.getCell('I1').font = font;

    ws.getCell('J1').font = font;
    ws.getCell('K1').font = font;
    ws.getCell('L1').font = font;
    ws.getCell('M1').font = font;
    ws.getCell('N1').font = font;

    ws.addRows(data);
    workbook.xlsx.writeFile(`day-${day}.xlsx`);
  },
};

module.exports = service;
