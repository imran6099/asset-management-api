const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { itemService } = require('../services');

const createItem = catchAsync(async (req, res) => {
  const item = await itemService.createItem(req.body);
  res.status(httpStatus.CREATED).send(item);
});

const createManyItems = catchAsync(async (req, res) => {
  await itemService.createManyItems(req.body.items);
  res.status(httpStatus.CREATED).send('Done!');
});

const getItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['category', 'location']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await itemService.queryItems(filter, options);
  res.send(result);
});

const getItem = catchAsync(async (req, res) => {
  const item = await itemService.getItemById(req.params.itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(item);
});

const updateItem = catchAsync(async (req, res) => {
  const item = await itemService.updateItemById(req.params.itemId, req.body);
  res.send(item);
});

const deleteItem = catchAsync(async (req, res) => {
  await itemService.deleteItemById(req.params.itemId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyItems = catchAsync(async (req, res) => {
  await itemService.deleteManyItemsById(req.body.ids);
  res.status(httpStatus.NO_CONTENT).send('Done!');
});

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  createManyItems,
  deleteManyItems,
};
