const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { telegramService } = require('../services');

const sendTestMessage = catchAsync(async (req, res) => {
  const response = await telegramService.sendTestMessage();
  res.status(httpStatus.CREATED).send(response.data);
});

module.exports = {
  sendTestMessage,
};
