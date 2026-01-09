const groupModel = require('../models/groupModel');

//opret en ny group
exports.createGroup = async (req, res) => {
    try {
        const group = new groupModel(req.body);
        await group.save();
        res.status(201).send(group);
    } catch (error) {
        res.status(400).send(error);
    }
};

//hent alle groups
exports.getAllGroups = async (req, res) => {
    try {
        const groups = await groupModel.find();
        res.status(200).send(groups);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Hent en group by id
exports.getGroupById = async (req, res) => {
    try {
        const group = await groupModel.findById(req.params.id);
        if (!group) {
            return res.status(404).send({ message: 'Group not found' });
        }
        res.status(200).send(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//opdatere en group by id
exports.updateGroupByID = async (req, res) => {
    try {
        const updatedGroup = await groupModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGroup) {
            return res.status(404).send({ message: 'Group not found' });
        }
        res.status(200).send(updatedGroup);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//slet en group by id
exports.deleteGroupById = async (req, res) => {
    try {
        const group = await groupModel.findByIdAndDelete(req.params.id);
        if (!group) {
            return res.status(404).send({ message: 'Group not found' });
        }
        res.status(200).send({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};