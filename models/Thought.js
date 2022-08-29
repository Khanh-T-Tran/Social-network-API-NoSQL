const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        match: '/^.{0,20}$/',       
    },
    createdAt: {
        
    }
})

module.exports = model('Thought', userSchema);
