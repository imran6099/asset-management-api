const httpStatus = require('http-status');
const { Transfer } = require('../models');
const ApiError = require('../utils/ApiError');

const createTransfer = async (transfer) => {
  return Transfer.create(transfer);
};

/**
 * Query for transfers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTransfers = async (filter, options) => {
  const transfers = await Transfer.paginate(filter, options);
  return transfers;
};

const getTransferById = async (id) => {
  return Transfer.findById(id).populate('transferRequestFrom').populate('item');
};

const updateTransferById = async (transferId, updateBody) => {
  const transfer = await getTransferById(transferId);
  if (!transfer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transfer not found');
  }
  Object.assign(transfer, updateBody);
  await transfer.save();
  return transfer;
};

const updateTransferReqStatus = async (transferId, transferReqStatus) => {
  const transfer = await getTransferById(transferId);
  if (!transfer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transfer not found');
  }
  Object.assign(transfer, transferReqStatus);
  await transfer.save();
  return transfer;
};

const updateTransferReturnStatus = async (transferId, updateBody) => {
  const transfer = await getTransferById(transferId);
  if (!transfer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transfer not found');
  }
  Object.assign(transfer, updateBody);
  await transfer.save();
  return transfer;
};

const deleteTransferById = async (transferId) => {
  const transfer = await getTransferById(transferId);
  if (!transfer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transfer not found');
  }
  await transfer.remove();
  return transfer;
};

module.exports = {
  createTransfer,
  queryTransfers,
  getTransferById,
  updateTransferById,
  deleteTransferById,
  updateTransferReqStatus,
  updateTransferReturnStatus,
};
