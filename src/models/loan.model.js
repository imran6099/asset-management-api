const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { issueStatus } = require('../config/issue');
const { location } = require('../config/item');

const loanSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    loanRequestFrom: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    reason: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    dateOfLoan: {
      type: Date,
      required: true,
    },
    images: [],
    locationOfUse: {
      type: String,
      required: true,
      enum: [location.JUUNGAL, location.KM13],
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
    loanReqStatus: {
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
loanSchema.plugin(toJSON);
loanSchema.plugin(paginate);

/**
 * @typedef User
 */
const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
