const express = require('express');
const connection = require('./config/connection');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
// const routes = require('./routes');

// require User schema/collection from the models folder
const { User, Thought } = require('./models');

// setup express app and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Express body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express router
// app.use(routes);

// Create routes for USER
// Post route for posting new users
app.post('/api/users', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            userPassword: req.body.userPassword,
            thoughts: [req.body.thoughts],
            friends: [req.body.friends],
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get route for all users
app.get('/api/users', async (req, res) => {
    try {
        // find all users excluded password field - for practice
        const users = await User.find().select('-userPassword');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
})
// Get route for a single user by ID
app.get('/api/users/:userId', async (req, res) => {
    try {
        const singleUser = await User.findById({
            _id: ObjectId(req.params.userId),
        });

        res.status(200).json(singleUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});


// Put route for updating a user by it's ID
app.put('/api/users/:userId', async (req, res) => {
    try {
        // findByIdAndUpdate takes 3 params       
        const updatedUser = await User.findByIdAndUpdate(
            // 1st one is ID of thing we want to update
            req.params.userId,
            // 2nd one is what updates we want to make // updated data show on mongoDb but will not show on postman after put request
            { ...req.body },
            // 3rd one is configuration e.g should we call schema "hooks" // make updated data shows up on postman
            {new: true},
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// Delete route for deleting a user by it's ID
app.delete('/api/users/:userId', async (req, res) => {
    try {       
        const deletedUser = await User.findByIdAndDelete({
            _id: ObjectId(req.params.userId),
            // cascading thoughts when user is deleted
            thoughts: req.params.thoughts,
        });
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
})

// Create routes for FRIEND
// post route to add a new friend to a user's friend list
app.post('/api/users/:userId/friends/', async (req, res) => {
    try {
        console.log(req.params.userId);
        const newFriend = await User.findOne(req.body);
        console.log(req.body, newFriend);

        const addedFriend = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $addToSet: {
                    friends: newFriend._id,
                }
            },
            {
                new: true,
            },
        ).populate('friends');

        res.status(200).json(addedFriend);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// delete route to remove a friend from a user's friend list
app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const deletedFriend = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $pull: {
                    friends: req.params.friendId,
                }
            },
            {
                new: true,
            }
        ).populate('friends');
        res.status(200).json(deletedFriend);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// Create routes for THOUGHTS
// get route for getting all thoughts
app.get('/api/thoughts', async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        res.status(200).json(allThoughts);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// get route for getting a thought by ID
app.get('/api/thoughts/:thoughtId', async (req, res) => {
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
app.post('/api/thoughts', async (req, res) => {
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
app.put('/api/thoughts/:thoughtId', async (req, res) => {
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
app.delete('/api/thoughts/:thoughtId', async (req, res) => {
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
app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
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
app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
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

// to start express server

    app.listen(PORT, () => console.log("server started successfully!!"));


