const mongoose = require('mongoose');
const uuid = require('uuid');
const model = {};

const transferredSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  day: String,
  productId: String,
  productName: String,
  originalPrice: String,
  currentPrice: String,
  // price: String,
  styleNumber: String,
  typeString: String,
  type: Number,
  month: Number,
  gender: Number,
  genderStr: String,
  isSoldOut: {
    type: Boolean,
    default: false,
  },
  link: String,
});

transferredSchema.statics.createData = function(payload) {
  return this.create({ ...payload });
};

transferredSchema.statics.getData = function(payload) {
  return this.find(payload)
    .sort({
      day: 1,
    })
    .exec();
};

model.transferred = mongoose.model('transferred', transferredSchema);
module.exports = model;
