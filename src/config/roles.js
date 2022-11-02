const allRoles = {
  user: ['getItems', 'getIssues', 'getCategories', 'manageIssues', 'seeInsights', 'getTransfers', 'getLoans'],
  manager: [
    'getItems',
    'manageItems',
    'getIssues',
    'manageIssues',
    'getCategories',
    'manageCategories',
    'seeInsights',
    'manageTransfers',
    'getTransfers',
    'manageLoans',
    'getLoans',
  ],
  admin: [
    // User rights
    'getUsers',
    'manageUsers',

    // Items rights
    'getItems',
    'manageItems',

    // Issues rights
    'getIssues',
    'manageIssues',
    'manageIssueStatus',

    // Category rights
    'getCategories',
    'manageCategories',

    // Insights rights
    'seeInsights',

    // Transfer rights
    'manageTransfers',
    'getTransfers',
    'manageTransferReqStatus',
    'manageTransferReturnStatus',

    // Loan Rights
    'manageLoans',
    'getLoans',
    'manageLoanReqStatus',
    'manageLoanReturnStatus',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
