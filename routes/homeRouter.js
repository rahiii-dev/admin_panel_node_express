const router = require('express').Router();

const controller = require('../controller/homeController');

router.get('/', controller.renderHomePage);

module.exports = router