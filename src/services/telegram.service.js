const axios = require('axios');
const { userService, itemService } = require('.');

const sendTestMessage = async () => {
  return axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendMessage?chat_id=${
      process.env.ENG_NUUR_CHAT_ID
    }&text=${'This is a test message 2'}`
  );
};

const sendFaultReport = async (data) => {
  const user = await userService.getUserById(data.issuedBy);
  const item = await itemService.getItemById(data.item);

  const message = `
  *==== New fault report ====*\n
  New fault is reported for *${item.name}* by *${user.name}* on *${data.issuedDate}*\n *Title: ${data.title}.* \n *Description :* ${data.description}. \n Please review the fault on: https://local-asset-management.web.app/admin/issue/${data.id}/
  `;

  return axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendPhoto`, {
    chat_id: process.env.ENG_NUUR_CHAT_ID,
    photo: item.images[0],
    caption: message,
    parse_mode: 'markdown',
  });
};

const sendTransferReport = async (data) => {
  const user = await userService.getUserById(data.transferRequestFrom);
  const item = await itemService.getItemById(data.item);

  const message = `
  *==== New Transfer report ====*\n
   Transfer was requested from *${user.name}* for item *${item.name}*\n
  *Reason:* ${data.reason}\n
  *Transfer to:* ${data.transferTO.whom} in ${data.transferTO.where}\n
  *Date of transfer:* ${data.dateOfTransfer}.\n
  *Estimated return date:* ${data.dateOfReturn}.\n
  *Status: * ${data.transferReqStatus}.\n
  
  Please review the Transfer on: https://local-asset-management.web.app/admin/transfer/${data.id}/
  `;

  return axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendPhoto`, {
    chat_id: process.env.ENG_NUUR_CHAT_ID,
    photo: item.images[0],
    caption: message,
    parse_mode: 'markdown',
  });
};

const sendLoanReport = async (data) => {
  const user = await userService.getUserById(data.loanRequestFrom);

  const message = `
  *==== New Loan report ====*\n
  Laon was requested from *${user.name}* for item *${data.itemName}*\n
  *Reason:* ${data.reason}\n
  *Item owner:* ${data.owner}\n
  *Date of loan:* ${data.dateOfLoan}.\n
  *Estimated return date:* ${data.dateOfReturn}.\n
  *Status: * ${data.loanReqStatus}.\n
  
  Please review the Transfer on: https://local-asset-management.web.app/admin/loan/${data.id}/
  `;

  return axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendPhoto`, {
    chat_id: process.env.ENG_NUUR_CHAT_ID,
    photo: data.images[0],
    caption: message,
    parse_mode: 'markdown',
  });
};

const sendTransferReturnedReport = async (data) => {
  let message;
  if (data.returned === true) {
    message = `
    *==== Transfer Return Update ====*\n
    *${data.item.name}* was transferred by *${data.transferRequestFrom.name}* on *${data.dateOfTransfer}* now successfully returned!\n
    `;
    return axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendPhoto`, {
      chat_id: process.env.ENG_NUUR_CHAT_ID,
      photo: data.POD[0],
      caption: message,
      parse_mode: 'markdown',
    });
  }
  if (data.returned === false) {
    message = `
    *==== Transfer Return Update ====*\n
    *${data.item.name}* was transferred by *${data.transferRequestFrom.name}* on *${data.dateOfTransfer}* return status is updated to #false!\n
    `;
    return axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendMessage`, {
      chat_id: process.env.ENG_NUUR_CHAT_ID,
      text: message,
      parse_mode: 'markdown',
    });
  }
};

const sendLoanReturnedReport = async (data) => {
  let message;
  if (data.returned === true) {
    message = `
    *==== Loan Return Update ====*\n
    *${data.itemName}* was loaned by *${data.loanRequestFrom.name}* on *${data.dateOfLoan}* now successfully returned!\n
    `;
    return axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendPhoto`, {
      chat_id: process.env.ENG_NUUR_CHAT_ID,
      photo: data.POD[0],
      caption: message,
      parse_mode: 'markdown',
    });
  }
  if (data.returned === false) {
    message = `
    *==== Loan Return Update ====*\n
    *${data.itemName}* was loaned by *${data.loanRequestFrom.name}* on *${data.dateOfLoan}* return status is updated to #false!\n
    `;
    return axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendMessage`, {
      chat_id: process.env.ENG_NUUR_CHAT_ID,
      text: message,
      parse_mode: 'markdown',
    });
  }
};

module.exports = {
  sendTestMessage,
  sendFaultReport,
  sendLoanReport,
  sendTransferReport,
  sendTransferReturnedReport,
  sendLoanReturnedReport,
};
