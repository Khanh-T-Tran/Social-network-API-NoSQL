const { Schema, model } = require('mongoose');
// Create the blueprint for mongo collection
const userSchema = new Schema({
    username: {
        type: String,
        Unique: true,
        required: [true, "Please enter an username"],
        trim: true
    }
    email: {
        type: String,
        required: [true, "Email address is required"],
        Unique: true,
        validate: [validateEmail, "Please enter a valid email address"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
    // Array of _id values referencing the "Thought" model
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    // Array of _id values referencing the "User" model (self-reference)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
});

//  create and export the collection so we can use it in other files
module.exports = model('User', userSchema); // 1st para: name of the collection, 2nd para: the blueprint that we use for this collection.