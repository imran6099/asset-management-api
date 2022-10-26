const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { itemStatus } = require('../config/item');
const Counter = require('./counter..model');

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    itemNumber: {
      type: String,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [itemStatus.ACTIVE, itemStatus.INACTIVE, itemStatus.DAMAGED],
      required: true,
      default: 'active',
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
    },
    dateOfPurchase: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

itemSchema.pre('save', async function (next) {
  const doc = this;
  await Counter.findByIdAndUpdate(
    { _id: 'ITEM-' },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true,
    }
  )
    .then(function (count) {
      // eslint-disable-next-line prefer-template
      doc.itemNumber = count._id + ('000000' + count.seq).slice(-6);
      next();
    })
    .catch(function (err) {
      throw err;
    });
});

/**
 * @typedef User
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
