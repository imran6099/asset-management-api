const { Item, Category, Issue } = require('../models');
/**
 * Create a item
 * @param {Object} item
 * @returns {Promise<item>}
 */
const getTotals = async () => {
  const totalItems = await Item.count();
  const totalIssues = await Issue.count();
  const totalCategories = await Category.count();
  const totals = {
    totalItems,
    totalCategories,
    totalIssues,
  };
  return totals;
};

// const getItemsBasedOnCategory = async () => {
//   const totalItems = await Item.count();
//   const totals = {
//     totalItems,
//   };
//   return totals;
// };

const getItemsBasedOnStatus = async () => {
  const activeItems = await Item.find({ status: 'active' });
  const inactiveItems = await Item.find({ status: 'inactive' });
  const damagedItems = await Item.find({ status: 'damaged' });

  const items = {
    activeItems,
    inactiveItems,
    damagedItems,
  };
  return items;
};
module.exports = {
  getTotals,
  getItemsBasedOnStatus,
};
