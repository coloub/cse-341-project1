const mongodb = require('../data/database');
const ObjectId =  require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('contacts').find();
        const contacts = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error getting all contacts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactsId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('contacts').find({ _id: contactsId });
        const contacts = await result.toArray();
        if (contacts.length === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    } catch (error) {
        console.error('Error getting single contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const result = await mongodb.getDatabase().collection('contacts').insertOne(newContact);

        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactsId = new ObjectId(req.params.id);
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const updatedContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };

        const result = await mongodb.getDatabase().collection('contacts').replaceOne(
            { _id: contactsId },
            updatedContact
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactsId = new ObjectId(req.params.id);

        const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactsId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
