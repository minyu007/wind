const Router = require('koa-router');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');

const utils = require('./utils');
// const service = require('./service');
const router = new Router();

router.get('/gs-amac/download-excel', async function(ctx, next) {
  utils.log(`/gs-amac/download-excel`);

  let filename = `../day-20200323.xlsx`;
  let filePath = path.join(__dirname, filename);
  ctx.type = 'xlsx';
  ctx.body = fs.createReadStream(filePath);
});

router.get('/gs-amac/download-excel2', async function(ctx, next) {
  utils.log(`/gs-amac/download-excel2`);

  let filename = `../columnLine.xlsx`;
  let filePath = path.join(__dirname, filename);
  ctx.type = 'xlsx';
  ctx.body = fs.createReadStream(filePath);
});

// router.get('/urban-outfitters/get-data', async function(ctx, next) {
//   try {
//     utils.log(`/urban-outfitters/get-data`);
//     const data = service.getData();
//     ctx.body = {
//       status: 200,
//       data,
//     };
//   } catch (e) {
//     ctx.body = {
//       status: 500,
//       info: 'error',
//     };
//   }
// });

// router.get('/urban-outfitters/download-excel-2', async function(ctx, next) {
//   try {
//     const fileName = ctx.request.query.fileName;
//     utils.log(`/urban-outfitters/download-excel-2?fileName=${fileName}`);

//     let filename = `../${fileName}.xlsx`;
//     let filePath = path.join(__dirname, filename);
//     ctx.type = 'xlsx';
//     ctx.body = fs.createReadStream(filePath);
//   } catch (e) {
//     ctx.body = {
//       status: 500,
//       info: 'error',
//     };
//   }
// });

// router.get('/urban-outfitters/get-data-2', async function(ctx, next) {
//   try {
//     utils.log(`/urban-outfitters/get-data-2`);
//     const data = await service.getData2({});
//     ctx.body = {
//       status: 200,
//       data,
//     };
//   } catch (e) {
//     ctx.body = {
//       status: 500,
//       info: 'error',
//     };
//   }
// });

// router.get('/urban-outfitters/gotoScrape', async function(ctx, next) {
//   try {
//     utils.log(`/urban-outfitters/gotoScrape`);
//     const data = await service.gotoScrape();
//     require('./crawler').scrape();
//     ctx.body = {
//       status: 200,
//       data: data,
//     };
//   } catch (e) {
//     ctx.body = {
//       status: 500,
//       info: 'error',
//       data: false,
//     };
//   }
// });

module.exports = router;
