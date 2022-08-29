const express = require('express');
const connection = require('./config/connection');

// require User schema/collection from the models folder
const { User } = require('./models'); 

// setup express app and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Express body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create routes for user
app.post('/api/users', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            // thoughts: [req.body.thoughts],
            // friends: [req.body.friends],
        });
        res.json(newUser);

    } catch (error) {
        res.status(500).json({ error });
    }

});

// to start express server
app.listen(PORT, () => console.log("server started successfully!!"));