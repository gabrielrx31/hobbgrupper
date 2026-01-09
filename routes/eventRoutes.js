const express = require('express');
const eventController = require('../controllers/eventController');
const validateEvent = require('../middleware/eventValidation');

const router = express.Router();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', validateEvent, eventController.createEvent);
router.put('/:id', eventController.updateEventById);
router.delete('/:id', eventController.deleteEventById);

module.exports = router;