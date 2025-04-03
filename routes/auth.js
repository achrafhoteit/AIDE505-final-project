const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

const router = express.Router();

// POST /register
router.post('/register', async (req, res) => {
const { email, password } = req.body;

try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2)',
    [email, hashedPassword]
    );
    res.json({ success: true, message: 'User registered' });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
}
});

// POST /login
router.post('/login', async (req, res) => {
const { email, password } = req.body;

try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
}
});

module.exports = router;
