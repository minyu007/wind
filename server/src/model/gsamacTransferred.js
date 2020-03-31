const mongoose = require('mongoose');
const uuid = require('uuid');
const model = {};

const gsamacTransferredSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  day: String,
  fundName: String,
  fundCode: String,
  EstablishedDate: String,
  EstablishedDateStamp: String,
  FilingDate: String,
  recodingStage: String,
  fundType: String,
  fundTypeCode: String,
  currency: String,
  fundManager: String,
  ManagementType: String,
  custodianName: String,
  status: String,
  LastUpdate: String,
  SpecialTips: String,
});

gsamacTransferredSchema.statics.createData = function(payload) {
  return this.create({ ...payload });
};

gsamacTransferredSchema.statics.updateStatus = function(payload) {
  return this.updateMany(
    {
      day: payload.day,
      status: '1',
    },
    {
      $set: {
        status: '2',
      },
    }
  );
};

gsamacTransferredSchema.statics.getData = function(payload) {
  return this.find(payload)
    .sort({
      day: 1,
    })
    .exec();
};

model.gsamacTransferred = mongoose.model('gsamacTransferred', gsamacTransferredSchema);
module.exports = model;
