const express = require('express');
const axios = require('axios');
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Save the summary
router.post('/', authenticateToken, async (req, res) => {
    const { original_text } = req.body;
    const userId = req.user.userId;

    try {
        // Call the Flask API
        const response = await axios.post('http://127.0.0.1:5000/summarize', {
        text: original_text
        });

        const summary_text = response.data.summary;

        // Save to DB
        await pool.query(
        'INSERT INTO summaries (user_id, original_text, summary_text) VALUES ($1, $2, $3)',
        [userId, original_text, summary_text]
        );

        res.json({ summary: summary_text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to summarize or save' });
    }
});

// Get all summaries for logged-in user
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await pool.query(
        'SELECT * FROM summaries WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch summaries' });
    }
});

module.exports = router;
