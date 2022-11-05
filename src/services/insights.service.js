const { Item, Category, Issue, User, Loan, Transfer } = require('../models');
/**
 * Create a item
 * @param {Object} item
 * @returns {Promise<item>}
 */
const getTotals = async () => {
  const totalItems = await Item.count();
  const totalIssues = await Issue.count();
  const totalCategories = await Category.count();
  const totalTransfers = await Transfer.count();
  const totalLoans = await Loan.count();
  const totalUsers = await User.count();

  const totals = {
    totalItems,
    totalCategories,
    totalIssues,
    totalTransfers,
    totalLoans,
    totalUsers,
  };
  return totals;
};

const getItemsBasedOnCategory = async () => {
  const results = await Category.aggregate([
    {
      $lookup: {
        from: 'items',
        localField: '_id',
        foreignField: 'category',
        as: 'items',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        items: { $size: '$items' },
      },
    },
  ]).exec();
  return results;
};

const getItemsBasedOnStatus = async () => {
  const activeItems = await Item.find({ status: 'active' }).count();
  const inactiveItems = await Item.find({ status: 'inactive' }).count();
  const damagedItems = await Item.find({ status: 'damaged' }).count();
  const response = [
    { quantity: activeItems, status: 'active' },
    { quantity: inactiveItems, status: 'inactive' },
    { quantity: damagedItems, status: 'damaged' },
  ];
  return response;
};

const getIssuesBasedOnStatus = async () => {
  const activeIssues = await Issue.find({ status: 'accepted' }).count();
  const inactiveIssues = await Issue.find({ status: 'under review' }).count();
  const damagedIssues = await Issue.find({ status: 'rejected' }).count();
  const response = [
    { quantity: activeIssues, status: 'accepted' },
    { quantity: inactiveIssues, status: 'under review' },
    { quantity: damagedIssues, status: 'rejected' },
  ];
  return response;
};

const getItemsBasedOnLocation = async () => {
  const totalItems = await Item.find({}).count();

  const juungalItems = await Item.find({ location: 'juungal' }).count();
  const km13Items = await Item.find({ location: 'km13' }).count();

  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }
  const p1 = percentage(juungalItems, totalItems);
  const p2 = percentage(km13Items, totalItems);

  const response = [
    { label: 'Juungal', percent: p1.toFixed(2), total: juungalItems },
    { label: 'KM13', percent: p2.toFixed(2), total: km13Items },
  ];
  return response;
};

const getTransfersBasedOnReturnStatus = async () => {
  const returnedItems = await Transfer.find({ returned: true }).count();
  const notReturnedItems = await Transfer.find({ returned: false }).count();

  const response = [
    { label: 'Returned', value: returnedItems },
    { label: 'Not Returned', value: notReturnedItems },
  ];
  return response;
};

const getLoansBasedOnReturnStatus = async () => {
  const returnedItems = await Loan.find({ returned: true }).count();
  const notReturnedItems = await Loan.find({ returned: false }).count();

  const response = [
    { label: 'Returned', value: returnedItems },
    { label: 'Not Returned', value: notReturnedItems },
  ];
  return response;
};

module.exports = {
  getTotals,
  getItemsBasedOnStatus,
  getIssuesBasedOnStatus,
  getItemsBasedOnLocation,
  getItemsBasedOnCategory,
  getTransfersBasedOnReturnStatus,
  getLoansBasedOnReturnStatus,
};
