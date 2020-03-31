const Router = require('koa-router');
const koaBody = require('koa-body')({ multipart: true, uploadDir: '.' });
const fs = require('fs');
const path = require('path');

const utils = require('./utils');
// const service = require('./service');
const router = new Router();

router.post('/wind-server/upload', koaBody, async function(ctx, next) {
  utils.log(`/wind-server/upload`);

  const { name, path } = ctx.request.files.file;
  await fs.copyFileSync(path, `../${name}`);
  ctx.body = {
    status: 200,
    data: true,
  };
});

module.exports = router;
