const mongoose = require('mongoose');
const uuid = require('uuid');
const model = {};

const productSchema = new mongoose.Schema({
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
  price: String,
  styleNumber: String,
  typeString: String,
  link: String,
  type: Number,
  month: Number,
  gender: Number,
  genderStr: String,
});

productSchema.statics.createData = function(payload) {
  return this.create({ ...payload });
};

productSchema.statics.getData = function(payload) {
  return this.find(payload)
    .sort({
      day: 1,
    })
    .exec();
};

model.product = mongoose.model('product', productSchema);
module.exports = model;
