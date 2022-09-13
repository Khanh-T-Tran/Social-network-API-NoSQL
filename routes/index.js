const router = require('express').Router();
const apiRoutes = require('./api');

// prepend '/api' to every route declared in apiRoutes
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route.'));

module.exports = router;