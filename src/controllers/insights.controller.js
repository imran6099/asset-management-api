const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { insightsService } = require('../services');

const getTotals = catchAsync(async (req, res) => {
  const totals = await insightsService.getTotals();
  res.status(httpStatus.CREATED).send(totals);
});

const getItemsWithCategory = catchAsync(async (req, res) => {
  const items = await insightsService.getItemsBasedOnCategory();
  res.status(httpStatus.CREATED).send(items);
});

const getItemsWithStatus = catchAsync(async (req, res) => {
  const items = await insightsService.getItemsBasedOnStatus();
  res.status(httpStatus.CREATED).send(items);
});

const getIssuesWithStatus = catchAsync(async (req, res) => {
  const issues = await insightsService.getIssuesBasedOnStatus();
  res.status(httpStatus.CREATED).send(issues);
});

const getItemsWithLocation = catchAsync(async (req, res) => {
  const items = await insightsService.getItemsBasedOnLocation();
  res.status(httpStatus.CREATED).send(items);
});

module.exports = {
  getItemsWithCategory,
  getTotals,
  getItemsWithStatus,
  getIssuesWithStatus,
  getItemsWithLocation,
};
