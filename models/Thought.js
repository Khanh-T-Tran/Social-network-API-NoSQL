const { Schema, model } = require('mongoose');
// import moment module timestamp's format 
const moment = require('moment')

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
})

module.exports = model('Thought', thoughtSchema);
