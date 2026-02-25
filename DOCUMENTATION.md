# Project Documentation

## Overview

A simple web application with a login page protected by username/password authentication.
Once logged in, users are redirected to a dashboard. Built with plain HTML/CSS/JS on the
frontend and Node.js + Express on the backend.

---

## Project Structure

```
project_ai/
├── server.js              ← Express backend (API endpoints)
├── package.json           ← Node.js project config
├── .gitignore             ← Excludes node_modules and .env from git
└── public/
    ├── login.html         ← Login page (entry point)
    ├── dashboard.html     ← Protected dashboard page
    └── style.css          ← Styling for all pages
```

---

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | HTML, CSS, JavaScript (vanilla) |
| Backend  | Node.js + Express   |
| Auth     | Session tokens (in-memory) |
| Hosting  | Railway             |
| Version Control | GitHub       |

---

## How It Works

### Authentication Flow

1. User visits `/` → served `login.html`
2. User enters username and password → form POSTs to `/api/login`
3. Backend validates credentials → returns a session token
4. Token is stored in `localStorage`
5. User is redirected to `/dashboard`
6. Dashboard calls `/api/verify` with the token on every load
7. If token is invalid or missing → user is redirected back to login
8. Logout calls `/api/logout` → token is invalidated → redirected to login

### API Endpoints

| Method | Endpoint      | Description                          |
|--------|---------------|--------------------------------------|
| POST   | `/api/login`  | Validate credentials, return token   |
| GET    | `/api/verify` | Check if session token is valid      |
| POST   | `/api/logout` | Invalidate session token             |

### Default Credentials

| Username | Password   |
|----------|------------|
| `admin`  | `admin123` |
| `user`   | `password` |

> These are hardcoded for demo purposes. For production, use a real database with hashed passwords (e.g., bcrypt).

---

## Running Locally

### Prerequisites
- Node.js installed

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js

# 3. Open in browser
http://localhost:3000
```

---

## Deployment (Railway)

### Steps Taken

1. Fixed port to use Railway's dynamic `$PORT`:
   ```js
   const PORT = process.env.PORT || 3000;
   ```

2. Added `start` script to `package.json`:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

3. Added `.gitignore` to exclude `node_modules/` and `.env`

4. Pushed code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/RufatX/ai_test1.git
   git branch -M main
   git push -u origin main
   ```

5. Deployed on [railway.app](https://railway.app):
   - Connected GitHub repo `RufatX/ai_test1`
   - Railway auto-detected Node.js and ran `npm start`
   - Generated a public domain under project Settings

---

## Security Notes

- Session tokens are stored in-memory (server restarts clear all sessions)
- Credentials are hardcoded — replace with a database for production
- Never share GitHub Personal Access Tokens in public chats
- For production: use bcrypt for password hashing, a real database (PostgreSQL, MongoDB), and HTTPS

---

## GitHub Repository

https://github.com/RufatX/ai_test1
