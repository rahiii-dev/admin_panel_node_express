const router = require('express').Router();
const controller = require('../controller/accountController');

router.get('/login', controller.renderLoginPage);

router.get('/register', controller.renderRegistrationPage);

module.exports = router;

