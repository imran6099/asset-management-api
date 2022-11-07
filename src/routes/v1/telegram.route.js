const express = require('express');
const telegramController = require('../../controllers/telegram.controller');

const router = express.Router();

router.route('/test').post(telegramController.sendTestMessage);
router.route('/send-fault-report').post(telegramController.sendTestMessage);
router.route('/send-transfer-report').post(telegramController.sendTestMessage);
router.route('/send-loan-report').post(telegramController.sendTestMessage);
router.route('/send-transfer-returned-update').post(telegramController.sendTestMessage);
router.route('/send-loan-returned-update').post(telegramController.sendTestMessage);

module.exports = router;
