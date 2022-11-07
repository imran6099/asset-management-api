const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { transferService, telegramService } = require('../services');

const createTransfer = catchAsync(async (req, res) => {
  const transfer = await transferService.createTransfer(req.body);
  await telegramService.sendTransferReport(transfer);
  res.status(httpStatus.CREATED).send(transfer);
});

const getTransfers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['transferRequestFrom', 'item', 'transferReqStatus']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await transferService.queryTransfers(filter, options);
  res.send(result);
});

const getTransfer = catchAsync(async (req, res) => {
  const transfer = await transferService.getTransferById(req.params.transferId);
  if (!transfer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transfer not found');
  }
  res.send(transfer);
});

const updateTransfer = catchAsync(async (req, res) => {
  const transfer = await transferService.updateTransferById(req.params.transferId, req.body);
  res.send(transfer);
});

const updateTransferReqStatus = catchAsync(async (req, res) => {
  const transfer = await transferService.updateTransferReqStatus(req.params.transferId, req.body);
  res.send(transfer);
});

const updateTransferReturnStatus = catchAsync(async (req, res) => {
  const transfer = await transferService.updateTransferReturnStatus(req.params.transferId, req.body);
  await telegramService.sendTransferReturnedReport(transfer);
  res.send(transfer);
});
const deleteTransfer = catchAsync(async (req, res) => {
  await transferService.deleteTransferById(req.params.transferId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTransfer,
  getTransfers,
  getTransfer,
  updateTransfer,
  deleteTransfer,
  updateTransferReqStatus,
  updateTransferReturnStatus,
};
