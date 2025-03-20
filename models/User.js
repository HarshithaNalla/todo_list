const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_fname: String,
    user_lname: String,
    user_id: String,
    password: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
