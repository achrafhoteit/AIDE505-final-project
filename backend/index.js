require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const app = express(); // Initializes your Express app (i.e., creates a new server)
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth'); // Imports the authentication routes from the file routes/auth.js
const summaryRoutes = require('./routes/summaries');

app.use('/auth', authRoutes); // Mounts them under /auth, so /auth/register or /auth/login will be valid API endpoints
app.use('/summaries', summaryRoutes);

app.listen(3001, () => console.log('🚀 Server running at http://localhost:3001')); // Starts the Express server on port 3001