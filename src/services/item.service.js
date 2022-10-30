const httpStatus = require('http-status');
const { Item } = require('../models');
const ApiError = require('../utils/ApiError');
const Counter = require('../models/counter..model');
/**
 * Create a item
 * @param {Object} item
 * @returns {Promise<item>}
 */
const createItem = async (item) => {
  return Item.create(item);
};

const createManyItems = async (items) => {
  if (Array.isArray(items) && items.length) {
    const tagedItems = items.map(async (item) => {
      const count = await Counter.findByIdAndUpdate(
        { _id: 'ITEM-' },
        { $inc: { seq: 1 } },
        {
          new: true,
          upsert: true,
        }
      );
      return new Promise((resolve) => {
        resolve({
          ...item,
          // eslint-disable-next-line prefer-template
          itemNumber: count._id + ('000000' + count.seq).slice(-6),
        });
      });
    });
    // eslint-disable-next-line no-param-reassign
    const docs = await Promise.all(tagedItems);
    return Item.insertMany(docs);
  }
};

/**
 * Query for items
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryItems = async (filter, options) => {
  const items = await Item.paginate(filter, options);
  return items;
};

/**
 * Get item by id
 * @param {ObjectId} id
 * @returns {Promise<item>}
 */
const getItemById = async (id) => {
  return Item.findById(id).populate('category');
};

/**
 * Update category by id
 * @param {ObjectId} itemId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateItemById = async (itemId, updateBody) => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  Object.assign(item, updateBody);
  await item.save();
  return item;
};

/**
 * Delete user by id
 * @param {ObjectId} itemId
 * @returns {Promise<Item>}
 */
const deleteItemById = async (itemId) => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await item.remove();
  return item;
};
const deleteManyItemsById = async (ids) => {
  return Item.deleteMany({ _id: ids });
};

module.exports = {
  createItem,
  queryItems,
  getItemById,
  updateItemById,
  deleteItemById,
  createManyItems,
  deleteManyItemsById,
};
