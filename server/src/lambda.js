const Router = require('koa-router');
const koaBody = require('koa-body')({ multipart: true, uploadDir: '.' });
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const utils = require('./utils');
// const service = require('./service');
const router = new Router();

router.post('/wind-server/upload', koaBody, async function(ctx, next) {
  utils.log(`/wind-server/upload`);

  const { name, path } = ctx.request.files.file;
  // console.log(ctx.request.files.file);
  await fs.copyFileSync(path, `../${name}`);
  ctx.body = {
    status: 200,
    data: true,
  };
});

router.post('/wind-server/compare', koaBody, async function(ctx, next) {
  utils.log(`/wind-server/compare`);

  const { fileList } = ctx.request.body;
  console.log(fileList);

  // let filename1 = `../${fileList[0]}`;
  // let filePath1 = path.join(__dirname, filename1);
  // let dataBuffer1 = fs.readFileSync(filename1);
  // const data1 = await pdf(dataBuffer1);

  // let filename2 = `../${fileList[1]}`;
  // let filePath2 = path.join(__dirname, filename2);
  // let dataBuffer2 = fs.readFileSync(filename2);
  // const data2 = await pdf(dataBuffer2);

  // let filename3 = `../${fileList[2]}`;
  // let filePath3 = path.join(__dirname, filename3);
  // let dataBuffer3 = fs.readFileSync(filename3);
  // const data3 = await pdf(dataBuffer3);

  let results = await Promise.all(
    fileList.map(async v => {
      let dataBuffer = fs.readFileSync(`../${fileList[0]}`);
      return await pdf(dataBuffer);
    })
  );
  console.log(results.length);
  ctx.body = {
    status: 200,
    data: [...results],
  };
  // await fs.copyFileSync(path, `../${name}`);
});

module.exports = router;
