const express = require('express');
const connection = require('./config/connection');
const routes = require('./routes');

// require User schema/collection from the models folder
const { User } = require('./models');

// setup express app and PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Express body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express router
app.use(routes);





// to start express server
app.listen(PORT, () => console.log("server started successfully!!"));