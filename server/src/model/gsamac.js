const mongoose = require('mongoose');
const uuid = require('uuid');
const model = {};

const gsamacSchema = new mongoose.Schema({
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
  FilingDate: String,
  recodingStage: String,
  fundType: String,
  currency: String,
  fundManager: String,
  ManagementType: String,
  custodianName: String,
  status: String,
  LastUpdate: String,
  SpecialTips: String,
});

gsamacSchema.statics.createData = function(payload) {
  return this.create({ ...payload });
};

gsamacSchema.statics.updateStatus = function(payload) {
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

gsamacSchema.statics.getData = function(payload) {
  return this.find(payload)
    .sort({
      day: 1,
    })
    .exec();
};

model.gsamac = mongoose.model('gsamac', gsamacSchema);
module.exports = model;
