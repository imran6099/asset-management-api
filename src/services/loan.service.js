const httpStatus = require('http-status');
const { Loan } = require('../models');
const ApiError = require('../utils/ApiError');

const createLoan = async (loan) => {
  return Loan.create(loan);
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
const queryLoans = async (filter, options) => {
  const loans = await Loan.paginate(filter, options);
  return loans;
};

const getLoanById = async (id) => {
  return Loan.findById(id).populate('loanRequestFrom');
};

const updateLoanById = async (loanId, updateBody) => {
  const loan = await getLoanById(loanId);
  if (!loan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loan not found');
  }
  Object.assign(loan, updateBody);
  await loan.save();
  return loan;
};

const updateLoanReqStatus = async (loanId, loanReqStatus) => {
  const loan = await getLoanById(loanId);
  if (!loan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loan not found');
  }
  Object.assign(loan, loanReqStatus);
  await loan.save();
  return loan;
};

const updateLoanReturnStatus = async (loanId, updateBody) => {
  const loan = await getLoanById(loanId);
  if (!loan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loan not found');
  }
  Object.assign(loan, updateBody);
  await loan.save();
  return loan;
};

const deleteLoanById = async (loanId) => {
  const loan = await getLoanById(loanId);
  if (!loan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loand not found');
  }
  await loan.remove();
  return loan;
};

module.exports = {
  createLoan,
  queryLoans,
  getLoanById,
  updateLoanById,
  deleteLoanById,
  updateLoanReqStatus,
  updateLoanReturnStatus,
};
