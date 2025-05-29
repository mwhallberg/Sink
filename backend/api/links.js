const express = require('express');
const router = express.Router();
const LinkModel = require('../models/link'); // Assuming a Link model exists

// Create a new link
router.post('/links', async (req, res) => {
    const { name, url } = req.body;
    try {
        const newLink = await LinkModel.create({ name, url });
        res.status(201).json(newLink);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create link' });
    }
});

// Update an existing link
router.put('/links/:id', async (req, res) => {
    const { id } = req.params;
    const { name, url } = req.body;
    try {
        const updatedLink = await LinkModel.findByIdAndUpdate(id, { name, url }, { new: true });
        res.status(200).json(updatedLink);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update link' });
    }
});

// Delete a link
router.delete('/links/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await LinkModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Link deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete link' });
    }
});

module.exports = router;
