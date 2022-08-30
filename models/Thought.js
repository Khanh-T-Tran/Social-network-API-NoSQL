const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        match: '/^.{1,280}$/',       
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        timestamps: true
    }
})

module.exports = model('Thought', thoughtSchema);
