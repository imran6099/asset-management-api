const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLoan = {
  body: Joi.object().keys({
    itemName: Joi.string().required(),
    loanRequestFrom: Joi.string().custom(objectId).required(),
    reason: Joi.string().required(),
    owner: Joi.string().required(),
    dateOfLoan: Joi.date().required(),
    images: Joi.array(),
    locationOfUse: Joi.string().required().valid('km13', 'juungal'),
    dateOfReturn: Joi.date().required(),
    returned: Joi.bool(),
    POD: Joi.string().allow(''),
    loanReqStatus: Joi.string(),
  }),
};

const getLoans = {
  query: Joi.object().keys({
    returned: Joi.bool(),
    loanRequestFrom: Joi.string().custom(objectId),
    loanReqStatus: Joi.string(),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLoan = {
  params: Joi.object().keys({
    loanId: Joi.string().custom(objectId),
  }),
};

const updateLoan = {
  params: Joi.object().keys({
    loanId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      itemName: Joi.string(),
      loanRequestFrom: Joi.string().custom(objectId),
      reason: Joi.string(),
      owner: Joi.string(),
      dateOfLoan: Joi.date(),
      images: Joi.array(),
      locationOfUse: Joi.string().required().valid('km13', 'juungal'),
      dateOfReturn: Joi.date(),
      loanReqStatus: Joi.string(),
    })
    .min(1),
};

const updateLoanReqStatus = {
  params: Joi.object().keys({
    loanId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      loanReqStatus: Joi.string().required(),
    })
    .min(1),
};

const updateLoanReturnStatus = {
  params: Joi.object().keys({
    loanId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      returned: Joi.bool().required(),
      POD: Joi.array().required(),
    })
    .min(1),
};

const deleteLoan = {
  params: Joi.object().keys({
    loanId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createLoan,
  getLoans,
  getLoan,
  updateLoan,
  deleteLoan,
  updateLoanReqStatus,
  updateLoanReturnStatus,
};
