const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { issueStatus } = require('../config/issue');

const transferSchema = mongoose.Schema(
  {
    item: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Item',
    },
    transferRequestFrom: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    reason: {
      type: String,
      required: true,
    },
    dateOfTransfer: {
      type: Date,
      required: true,
    },
    transferTO: {
      where: {
        type: String,
        required: true,
      },
      whom: {
        type: String,
        required: true,
      },
    },
    dateOfReturn: {
      type: Date,
      required: true,
    },
    returned: {
      type: Boolean,
      required: true,
      default: false,
    },
    POD: [],
    transferReqStatus: {
      type: String,
      enum: [issueStatus.UNDER_REVIEW, issueStatus.ACCEPTED, issueStatus.REJECTED],
      required: true,
      default: 'under review',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
transferSchema.plugin(toJSON);
transferSchema.plugin(paginate);

/**
 * @typedef User
 */
const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
