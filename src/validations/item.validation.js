const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    images: Joi.array(),
    status: Joi.string().required(),
    category: Joi.string().custom(objectId).required(),
    dateOfPurchase: Joi.date().required(),
    location: Joi.string().required(),
  }),
};

const createManyItems = {
  body: {
    items: Joi.array().items({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.string().custom(objectId).required(),
      status: Joi.string().required(),
      dateOfPurchase: Joi.date().required(),
      location: Joi.string().allow(''),
    }),
  },
};
const deleteManyItems = {
  body: {
    ids: Joi.array(),
  },
};

const getItems = {
  query: Joi.object().keys({
    category: Joi.string().custom(objectId),
    location: Joi.string(),
    sortBy: Joi.string(),
    populate: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};

const updateItem = {
  params: Joi.object().keys({
    itemId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      images: Joi.array(),
      status: Joi.string(),
      category: Joi.string().custom(objectId),
      dateOfPurchase: Joi.date(),
      location: Joi.string(),
    })
    .min(1),
};

const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  createManyItems,
  deleteManyItems,
};
