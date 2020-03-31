const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const gsamacModel = require('./model/gsamac');
const gsamacTransferredModel = require('./model/gsamacTransferred');

// [ '基金专户', '股权投资基金', '私募证券投资基金', '其他私募投资基金', '信托计划', '创业投资基金' ]
const getFundTypeCode = fundType => {
  let code = 0;
  switch (fundType) {
    case '基金专户':
      code = 0;
      break;
    case '股权投资基金':
      code = 1;
      break;
    case '私募证券投资基金':
      code = 2;
      break;
    case '其他私募投资基金':
      code = 3;
      break;
    case '信托计划':
      code = 4;
      break;
    case '创业投资基金':
      code = 5;
      break;
    case '歌斐债券型私募证券投资基金':
      code = 6;
      break;

    case '其他类型':
      code = 0;
      break;
  }
  return code;
};

const getQuarter = date => {
  const arr = date.split('-');

  const year = arr[0];
  const month = arr[1];

  let quarter = 1;
  switch (month) {
    case '01':
      quarter = 1;
      break;
    case '02':
      quarter = 1;
      break;
    case '03':
      quarter = 1;
      break;
    case '04':
      quarter = 2;
      break;
    case '05':
      quarter = 2;
      break;
    case '06':
      quarter = 2;
      break;
    case '07':
      quarter = 3;
      break;
    case '08':
      quarter = 3;
      break;
    case '09':
      quarter = 3;
      break;
    case '10':
      quarter = 4;
      break;
    case '11':
      quarter = 4;
      break;
    case '12':
      quarter = 4;
      break;
  }
  return parseInt(year + quarter);
};

module.exports = {
  transfer: async day => {
    let data = await gsamacModel.gsamac.getData({
      day: day,
    });

    const transferredData = data.map(v => {
      let fundType =
        v.fundName.indexOf('歌斐') != -1 && v.fundName.indexOf('债券型私募证券') != -1
          ? '歌斐债券型私募证券投资基金'
          : v.fundType;

      fundType = fundType == '信托计划' || fundType == '基金专户' ? '其他类型' : fundType;
      return {
        day: v.day,
        fundName: v.fundName,
        fundCode: v.fundCode,
        EstablishedDate: v.EstablishedDate,
        FilingDate: v.FilingDate,
        recodingStage: v.recodingStage,
        fundType: fundType,
        currency: v.currency,
        fundManager: v.fundManager,
        ManagementType: v.ManagementType,
        custodianName: v.custodianName,
        status: v.status,
        LastUpdate: v.LastUpdate,
        SpecialTips: v.SpecialTips,
        fundTypeCode: getFundTypeCode(fundType),
        EstablishedDateStamp: getQuarter(v.EstablishedDate),
      };
    });

    transferredData.forEach(async v => {
      await gsamacTransferredModel.gsamacTransferred.createData({
        ...v,
      });
    });
  },
};
