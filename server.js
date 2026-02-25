const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory session store (not for production use)
const sessions = new Map();

// Hardcoded credentials (replace with a real database for production)
const USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'password' },
];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// POST /api/login — validate credentials and return a session token
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { username: user.username, createdAt: Date.now() });

  res.json({ token, username: user.username });
});

// GET /api/verify — check if a session token is valid
app.get('/api/verify', (req, res) => {
  const token = req.headers['authorization'];

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const session = sessions.get(token);
  res.json({ username: session.username });
});

// POST /api/logout — invalidate a session token
app.post('/api/logout', (req, res) => {
  const token = req.headers['authorization'];
  sessions.delete(token);
  res.json({ message: 'Logged out successfully.' });
});

// Serve login page at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve dashboard (protected by frontend JS)
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
