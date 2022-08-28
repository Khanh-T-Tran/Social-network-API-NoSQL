const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./models'); // require User schema/collection from the models folder
// setup express app and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// to connect to production database
mongoose.connect('mongodb+srv://khanhtran:38c0xSsxbdpcyASo@cluster0.6gpzdie.mongodb.net/social-network-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connect successful!!!!');
})
.catch(error => console.log(error));

// Express body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Create routes for user
app.post('/api/users', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            thoughts: [req.body.thoughts],
            friends: [req.body.friends],
        });
        res.json(newUser);

    } catch (error) {
        res.status(500).json({error});
    }

});

// to start express server
app.listen(PORT, () => console.log("server started successfully!!"));