// const router = require('express').Router();
const { Router } = require('express');
const { User,Thought } = require('../../models');

// Create routes for THOUGHTS
// get route for getting all thoughts
Router.get('/api/thoughts', async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        res.status(200).json(allThoughts);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// get route for getting a thought by ID
Router.get('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const oneThought = await Thought.findById({
            _id: req.params.thoughtId,
        });
        res.status(200).json(oneThought);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// post route for posting new thoughts
Router.post('/api/thoughts', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);

        const user = await User.findByIdAndUpdate(
            req.body.userId,
            {
                $addToSet: {
                    thoughts: newThought._id,
                }
            },
            {
                new: true,
            }
        ).populate('thoughts');
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// put route for updating a thought by its ID
Router.put('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { ...req.body },
            { new: true },
        );

        res.status(200).json(updatedThought);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// delete route for deleting a thought by its ID
Router.delete('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete({
            _id: ObjectId(req.params.thoughtId)
        });

        res.status(200).json(deletedThought);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router; 