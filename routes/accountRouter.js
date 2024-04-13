const router = require('express').Router();
const controller = require('../controller/accountController');

router.get('/login', controller.renderLoginPage);
router.post('/login', controller.authenticateUser);

router.get('/register', controller.renderRegistrationPage);
router.post('/register', controller.createUser);

router.get('/logout', controller.logoutUser);

module.exports = router;

