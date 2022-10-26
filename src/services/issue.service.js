const httpStatus = require('http-status');
const { Issue } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a issue
 * @param {Object} issue
 * @returns {Promise<issue>}
 */
const createIssue = async (issue) => {
  return Issue.create(issue);
};

/**
 * Query for issues
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryIssues = async (filter, options) => {
  const issues = await Issue.paginate(filter, options);
  return issues;
};

/**
 * Get issue by id
 * @param {ObjectId} id
 * @returns {Promise<issue>}
 */
const getIssueById = async (id) => {
  return Issue.findById(id).populate('issuedBy').populate('item');
};

/**
 * Update issue by id
 * @param {ObjectId} issueId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateIssueById = async (issueId, updateBody) => {
  const issue = await getIssueById(issueId);
  if (!issue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');
  }
  Object.assign(issue, updateBody);
  await issue.save();
  return issue;
};

const updateIssueStatus = async (issueId, status) => {
  const issue = await getIssueById(issueId);
  if (!issue) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Issue not found');
  }
  Object.assign(issue, status);
  await issue.save();
  return issue;
};

/**
 * Delete user by id
 * @param {ObjectId} issueId
 * @returns {Promise<Issue>}
 */
const deleteIssueById = async (issueId) => {
  const issuedBy = await getIssueById(issueId);
  if (!issuedBy) {
    throw new ApiError(httpStatus.NOT_FOUND, 'IssuedBy not found');
  }
  await issuedBy.remove();
  return issuedBy;
};

module.exports = {
  createIssue,
  queryIssues,
  getIssueById,
  updateIssueById,
  deleteIssueById,
  updateIssueStatus,
};
