const allRoles = {
  user: ['getItems', 'getIssues', 'getCategories'],

  admin: [
    'getUsers',
    'manageUsers',
    'manageIssueStatus',
    'getItems',
    'manageItems',
    'getIssues',
    'manageIssues',
    'getCategories',
    'manageCategories',
    'seeInsights',
  ],
  superAdmin: [
    'getUsers',
    'manageUsers',
    'manageIssueStatus',
    'getItems',
    'manageItems',
    'getIssues',
    'manageIssues',
    'getCategories',
    'manageCategories',
    'seeInsights',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
