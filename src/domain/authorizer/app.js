const AppFactory = require('../../commons/middlewares/app.middleware-auth');
const controller = require('./controller');

module.exports.handler = AppFactory.bootstrap(controller);
