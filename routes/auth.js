const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/sign_up', authController.sign_up_get);
router.post('/sign_up', authController.sign_up_post);

router.get('/log_in', authController.log_in_get);
router.post('/log_in', authController.log_in_post);

router.get('/log_out', authController.log_out_get);

router.get('/admin', authController.admin_get);
router.post('/admin', authController.admin_post);

router.get('/member', authController.member_get);
router.post('/member', authController.member_post);

module.exports = router;
