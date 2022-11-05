const express = require('express');
const auth = require('../../middlewares/auth');
const insightsController = require('../../controllers/insights.controller');

const router = express.Router();

router.route('/get-totals').get(auth('seeInsights'), insightsController.getTotals);
router.route('/get-items-based-on-status').get(auth('seeInsights'), insightsController.getItemsWithStatus);
router.route('/get-items-based-on-category').get(auth('seeInsights'), insightsController.getItemsWithCategory);
router.route('/get-issues-based-on-status').get(auth('seeInsights'), insightsController.getIssuesWithStatus);
router.route('/get-items-based-on-location').get(auth('seeInsights'), insightsController.getItemsWithLocation);
router
  .route('/get-transfers-based-on-return-status')
  .get(auth('seeInsights'), insightsController.getTransfersBasedOnReturnStatus);
router.route('/get-loans-based-on-return-status').get(auth('seeInsights'), insightsController.getLoansBasedOnReturnStatus);

module.exports = router;
