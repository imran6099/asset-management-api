const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const categoryRoute = require('./category.route');
const itemRoute = require('./item.route');
const issueRoute = require('./issue.route');
const insightsRoute = require('./insights.route');
const transferRoute = require('./transfer.route');
const loanRoute = require('./loan.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/items',
    route: itemRoute,
  },
  {
    path: '/issues',
    route: issueRoute,
  },
  {
    path: '/insights',
    route: insightsRoute,
  },
  {
    path: '/transfers',
    route: transferRoute,
  },
  {
    path: '/loans',
    route: loanRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
