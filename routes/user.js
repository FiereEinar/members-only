const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/:id', userController.user_profile_get);

router.get('/:id/edit', userController.user_edit_get);
router.post('/:id/edit', userController.user_edit_post);

module.exports = router;
