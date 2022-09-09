const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
// to connect to production database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false, // for using Model.findByIdUpdate()
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Export connection 
module.exports = mongoose.connection;
