const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.get('/message/add', indexController.message_add_get);
router.post('/message/add', indexController.message_add_post);

router.post('/message/:id/delete', indexController.message_delete_post);

module.exports = router;
