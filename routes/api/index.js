const router = require('express').Router();
// const express = require('express');

// import modular routers for /users and /thoughts
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// const routers = express();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;