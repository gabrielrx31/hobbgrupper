const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

router.get('/', groupController.getAllGroups);
router.get('/:id', groupController.getGroupById);
router.post('/', groupController.createGroup);
router.delete('/:id', groupController.deleteGroupById);

module.exports = router;