const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { insightsService } = require('../services');

const getTotals = catchAsync(async (req, res) => {
  const totals = await insightsService.getTotals();
  res.status(httpStatus.CREATED).send(totals);
});

const getItemsWithStatus = catchAsync(async (req, res) => {
  const items = await insightsService.getItemsBasedOnStatus();
  res.status(httpStatus.CREATED).send(items);
});

module.exports = {
  getTotals,
  getItemsWithStatus,
};
