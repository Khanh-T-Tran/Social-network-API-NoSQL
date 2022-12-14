const router = require('express').Router();
const apiRoutes = require('./api');

// /api will be appear before apiRoutes Ex: /api/apiRoutes in URL (prepending apiRoutes)
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });

module.exports = router;