const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The category name
 * @param {ObjectId} [excludeCategoryId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
categorySchema.statics.isNameTaken = async function (name, excludeCategoryId) {
  const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
  return !!category;
};

/**
 * @typedef User
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
