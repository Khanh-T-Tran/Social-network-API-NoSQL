const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
// to connect to production database
mongoose.connect('mongodb+srv://khanhtran:38c0xSsxbdpcyASo@cluster0.6gpzdie.mongodb.net/social-network-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connect successful!!!!');
    })
    .catch(error => console.log(error));

// Export connection 
module.exports = mongoose.connection;
