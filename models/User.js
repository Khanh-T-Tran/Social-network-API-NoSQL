const { Schema, model } = require('mongoose');
// require validator pakage (after npm i validator)
const validatorPackage = require('validator');
// Create the user blueprint for mongo collection
const userSchema = new Schema(
    {
        username: {
            type: String,
            Unique: true,
            required: [true, "Please enter an username"],
            trim: true
        },
        userPassword: {
            type: String,
            Unique: true,
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            Unique: true,
            validate: {
                validator: validatorPackage.isEmail,
                message: 'Please provide a valid email',
            },
        },
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
    },
    
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

//  create and export the collection so we can use it in other files
// 1st para: name of the collection, 2nd para: the blueprint that we use for this collection.
module.exports = model('User', userSchema); 