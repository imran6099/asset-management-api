const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const loanValidation = require('../../validations/loan.validation');
const loanController = require('../../controllers/loan.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageLoans'), validate(loanValidation.createLoan), loanController.createLoan)
  .get(auth('getLoans'), validate(loanValidation.getLoans), loanController.getLoans);

router
  .route('/:loanId')
  .get(auth('getLoans'), validate(loanValidation.getLoan), loanController.getLoan)
  .patch(auth('manageLoans'), validate(loanValidation.updateLoan), loanController.updateLoan)
  .delete(auth('manageLoans'), validate(loanValidation.deleteLoan), loanController.deleteLoan);

router
  .route('/update-loan-req-status/:loanId')
  .post(auth('manageLoanReqStatus'), validate(loanValidation.updateLoanReqStatus), loanController.updateLoanReqStatus);
router
  .route('/update-loan-return-status/:loanId')
  .post(
    auth('manageLoanReturnStatus'),
    validate(loanValidation.updateLoanReturnStatus),
    loanController.updateLoanReturnStatus
  );

module.exports = router;
