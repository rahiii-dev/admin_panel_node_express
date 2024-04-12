const router = require('express').Router();

const controller = require('../controller/homeController');

router.get('/', controller.get);

module.exports = router