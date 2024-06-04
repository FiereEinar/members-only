const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/sign_up', authController.sign_up_get);

module.exports = router;
