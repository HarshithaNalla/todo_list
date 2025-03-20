const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Todo', TodoSchema);
