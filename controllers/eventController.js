const eventModel = require('../models/eventModel');

//opret en ny event
exports.createEvent = async (req, res) => {
    try {
        const event = new eventModel(req.body);
        
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        res.status(400).send(error);
    }
};

//hent alle events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find();
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Hent en event by id
exports.getEventById = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
        res.status(200).send(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//opdater en event by id
exports.updateEventById = async (req, res) => {
    try { 
        updatedEvent = await eventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).send({ message: 'Event not found' });
        }
        res.status(200).send(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//slet en event by id
exports.deleteEventById = async (req, res) => {
    try {
        const event = await eventModel.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
        res.status(200).send({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};