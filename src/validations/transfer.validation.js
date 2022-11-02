const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTransfer = {
  body: Joi.object().keys({
    item: Joi.string().custom(objectId).required(),
    transferRequestFrom: Joi.string().custom(objectId).required(),
    reason: Joi.string().required(),
    dateOfTransfer: Joi.date().required(),
    transferTO: Joi.object()
      .keys({
        where: Joi.string(),
        whom: Joi.string(),
      })
      .required(),
    dateOfReturn: Joi.date().required(),
  }),
};

const getTransfers = {
  query: Joi.object().keys({
    item: Joi.string().custom(objectId),
    transferRequestFrom: Joi.string().custom(objectId),
    transferReqStatus: Joi.string(),
    populate: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTransfer = {
  params: Joi.object().keys({
    transferId: Joi.string().custom(objectId),
  }),
};

const updateTransfer = {
  params: Joi.object().keys({
    transferId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      item: Joi.string().custom(objectId),
      transferRequestFrom: Joi.string().custom(objectId),
      reason: Joi.string(),
      dateOfTransfer: Joi.date(),
      transferTO: Joi.object().keys({
        where: Joi.string(),
        whom: Joi.string(),
      }),
      dateOfReturn: Joi.date(),
      returned: Joi.bool(),
      POD: Joi.string(),
      transferReqStatus: Joi.string(),
    })
    .min(1),
};

const updateTransferReqStatus = {
  params: Joi.object().keys({
    transferId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      transferReqStatus: Joi.string().required(),
    })
    .min(1),
};
const updateTransferReturnStatus = {
  params: Joi.object().keys({
    transferId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      returned: Joi.bool().required(),
      POD: Joi.string().required(),
    })
    .min(1),
};

const deleteTransfer = {
  params: Joi.object().keys({
    transferId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createTransfer,
  getTransfers,
  getTransfer,
  updateTransfer,
  deleteTransfer,
  updateTransferReqStatus,
  updateTransferReturnStatus,
};
