const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createIssue = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    item: Joi.string().custom(objectId).required(),
    issuedBy: Joi.string().custom(objectId).required(),
    issuedDate: Joi.date().required(),
    status: Joi.string(),
  }),
};

const getIssues = {
  query: Joi.object().keys({
    issuedBy: Joi.string().custom(objectId),
    status: Joi.string(),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getIssue = {
  params: Joi.object().keys({
    issueId: Joi.string().custom(objectId),
  }),
};

const updateIssue = {
  params: Joi.object().keys({
    issueId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      item: Joi.string().custom(objectId),
      issuedBy: Joi.string().custom(objectId),
      issuedDate: Joi.date(),
      status: Joi.string(),
    })
    .min(1),
};

const updateIssueStatus = {
  params: Joi.object().keys({
    issueId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string().required(),
    })
    .min(1),
};

const deleteIssue = {
  params: Joi.object().keys({
    issueId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue,
  updateIssueStatus,
};
