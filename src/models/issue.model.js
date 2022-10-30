const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { issueStatus } = require('../config/issue');

const issueSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    item: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Item',
    },
    issuedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    issuedDate: {
      type: Date,
      required: true,
    },
    status: {
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
issueSchema.plugin(toJSON);
issueSchema.plugin(paginate);

/**
 * @typedef User
 */
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
