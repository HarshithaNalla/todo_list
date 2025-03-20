const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/users', async (req, res) => {
    const { user_fname, user_lname, user_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ user_fname, user_lname, user_id, password: hashedPassword });
    await user.save();
    res.json({ message: "User created", user });
});

// Get all users
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

// Login
router.post('/login', async (req, res) => {
    const { user_id, password } = req.body;
    const user = await User.findOne({ user_id });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
