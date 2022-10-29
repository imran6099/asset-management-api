const express = require('express');
const auth = require('../../middlewares/auth');
const insightsController = require('../../controllers/insights.controller');

const router = express.Router();

router.route('/get-totals').get(auth('seeInsights'), insightsController.getTotals);
router.route('/get-items-based-on-status').get(auth('seeInsights'), insightsController.getItemsWithStatus);
router.route('/get-items-based-on-category').get(auth('seeInsights'), insightsController.getTotals);
router.route('/get-issues-based-on-status').get(auth('seeInsights'), insightsController.getTotals);
router.route('/get-items-based-on-location').get(auth('seeInsights'), insightsController.getTotals);

module.exports = router;
