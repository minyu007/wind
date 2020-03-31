const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const Koa = require('koa');

const db = require('./db');
const router = require('./lambda');
const proceed = require('./proceed');
// const productModel = require('./model/product');
// const constants = require('./constants');

// const autoCreate = require('./crawler').scrape();
// const autoCreate = require('./proceed').transfer('20200313');

// require('./service').createExcel('20200323');

// require('./service').createExcelChart('20200323');
// proceed.transfer('20200323');

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());
app.listen(7723);
