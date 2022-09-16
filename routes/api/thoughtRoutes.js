const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;
// const { Router } = require('express');
const { User,Thought } = require('../../models');

// Create routes for THOUGHTS
// get route for getting all thoughts
router.get('/', async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        res.status(200).json(allThoughts);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// get route for getting a thought by ID
router.get('/:thoughtId', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.put('/:thoughtId', async (req, res) => {
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
router.delete('/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete({
            _id: ObjectId(req.params.thoughtId)
        });

        res.status(200).json(deletedThought);
    } catch (error) {
        res.status(500).json({ error });
    }
});


// Create routes for REACTIONS
// Post route for posting new reactions
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                $addToSet: {
                    reactions: req.body,
                }
            },
            {
                new: true,
            }
        ).populate('reactions');

        res.status(200).json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// Delete route for deleting a reaction by ID
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        // console.log("thoughtID line 244",req.params.thoughtId);
        // console.log("thoughtID line 245",req.params.reactionId);
        const deletedReaction = await Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId,
            },
            {
                $pull: {
                    reactions: {
                        _id: req.params.reactionId,
                    },
                },
                
            },
            {
                runValidators: true,
                new: true,
            }).exec();
// console.log("reaction",deletedReaction);
        res.status(200).json(deletedReaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

module.exports = router; 