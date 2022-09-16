const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;
// const { Router } = require('express');
const { User, Thought } = require('../../models');
// Create routes for USER
// Post route for posting new users
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
    try {
        // find all users excluded password field - for practice
        const users = await User.find().select('-userPassword');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
})
// Get route for a single user by ID
router.get('/:userId', async (req, res) => {
    console.log("get user by ID",req.params.userId);
    try {
        const singleUser = await User.findById(req.params.userId);      
        res.status(200).json(singleUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});


// Put route for updating a user by it's ID
router.put('/:userId', async (req, res) => {
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
router.delete('/:userId', async (req, res) => {
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
router.post('/:userId/friends', async (req, res) => {
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
router.delete('/:userId/friends/:friendId', async (req, res) => {
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



module.exports = router; 