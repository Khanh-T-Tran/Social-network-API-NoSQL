// const router = require('express').Router();
const { Router } = require('express');
const { User } = require('../../models');
// Create routes for USER
// Post route for posting new users
Router.post('/api/users', async (req, res) => {
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
Router.get('/api/users', async (req, res) => {
    try {
        // find all users excluded password field - for practice
        const users = await User.find().select('-userPassword');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
})
// Get route for a single user by ID
Router.get('/api/users/:userId', async (req, res) => {
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
Router.put('/api/users/:userId', async (req, res) => {
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
Router.delete('/api/users/:userId', async (req, res) => {
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

module.exports = router; 