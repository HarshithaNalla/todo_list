const express = require('express');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all todos
router.get('/todos', authMiddleware, async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
});

// Create a todo
router.post('/todos', authMiddleware, async (req, res) => {
    const { title } = req.body;
    const todo = new Todo({ title, user: req.user.id });
    await todo.save();
    res.json(todo);
});

// Get a todo by ID
router.get('/todos/:id', authMiddleware, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
});

// Update a todo
router.put('/todos/:id', authMiddleware, async (req, res) => {
    const { title, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
    res.json(todo);
});

// Delete a todo
router.delete('/todos/:id', authMiddleware, async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
});

module.exports = router;
