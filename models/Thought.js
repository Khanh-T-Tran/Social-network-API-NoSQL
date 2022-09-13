const { Schema, model } = require('mongoose');
// import moment module timestamp's format 
const moment = require('moment')

//thought's reactions array field on query schema
const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: [280],
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// Create the thought blueprint for mongo collection
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        match: '/^.{1,280}$/',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
        type: String,
        required: true,
    },
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

//  create and export the collection so we can use it in other files
// 1st para: name of the collection, 2nd para: the blueprint that we use for this collection.
module.exports = model('Thought', thoughtSchema);
