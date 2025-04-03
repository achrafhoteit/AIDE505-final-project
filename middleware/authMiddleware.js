const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) return res.status(401).json({ error: 'Token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        req.user = user; // attaches { userId: ... } to req
        next();
    });
}

module.exports = authenticateToken;
