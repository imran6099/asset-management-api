const allRoles = {
  user: ['getItems', 'getIssues', 'getCategories'],
  admin: ['getItems', 'manageItems', 'getIssues', 'manageIssues', 'getCategories', 'manageCategories'],
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
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
