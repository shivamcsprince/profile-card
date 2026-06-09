# 🪪 Profile Card App
🔗 Live Demo:https://profile-card-ux40.onrender.com

> A polished full-stack profile card web app with live editing — built with React, Node.js, and Express.

[![Made by shivamcsprince](https://img.shields.io/badge/author-shivamcsprince-7c6aff?style=flat-square)](https://github.com/shivamcsprince)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000?style=flat-square&logo=express)](https://expressjs.com)

---

## ✨ Features

- **Page 1 – Profile View** — Photo, name, title, bio, contact info, social links (LinkedIn / Instagram / GitHub), and action buttons (Call, Email, Open Social)
- **Page 2 – Edit Profile** — Clean form to update all fields; saved data reflects immediately on the profile page
- **REST API** — `GET /api/profile` and `PUT /api/profile` backed by a local JSON file
- **Responsive** — Looks great on mobile, tablet, and desktop
- **Loading skeletons** — Smooth shimmer placeholders while data loads
- **Toast notifications** — Success/error feedback on save
- **Production-ready** — Server serves the React build in production mode

---

## 🗂 Project Structure

```
profile-card/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Avatar.jsx
│       │   ├── EditForm.jsx
│       │   ├── ProfileCard.jsx
│       │   ├── ProfileSkeleton.jsx
│       │   └── Toast.jsx
│       ├── context/
│       │   └── ProfileContext.jsx
│       ├── pages/
│       │   ├── EditPage.jsx
│       │   └── ProfilePage.jsx
│       ├── styles/
│       │   └── global.css
│       ├── utils/
│       │   └── api.js
│       ├── App.jsx
│       └── index.js
│
├── server/                  # Node.js + Express backend
│   └── src/
│       ├── controllers/
│       │   └── profileController.js
│       ├── data/
│       │   └── profile.json       ← your data lives here
│       ├── routes/
│       │   └── profile.js
│       └── index.js
│
├── .gitignore
├── package.json             # root scripts with concurrently
├── Procfile                 # for Heroku deployment
└── README.md
```

---

## ⚙️ Prerequisites

Make sure these are installed on your machine:

| Tool    | Minimum Version | Check with        |
|---------|-----------------|-------------------|
| Node.js | 16.x            | `node -v`         |
| npm     | 8.x             | `npm -v`          |
| Git     | any             | `git --version`   |

---

## 🚀 Running Locally (Step-by-Step)

### 1. Clone the repository

```bash
git clone https://github.com/shivamcsprince/profile-card.git
cd profile-card
```

### 2. Install all dependencies

```bash
# From the project root — installs root, client, and server deps
npm run install:all
```

Or install manually:

```bash
# Root
npm install

# Client
cd client && npm install && cd ..

# Server
cd server && npm install && cd ..
```

### 3. Set up environment variables

**Server** — copy the example and edit:

```bash
cp server/.env.example server/.env
```

`server/.env` contents:

```env
PORT=5000
NODE_ENV=development
```

**Client** — copy the example and edit:

```bash
cp client/.env.example client/.env
```

`client/.env` contents:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the development servers

```bash
# From root — starts both client (port 3000) and server (port 5000) concurrently
npm run dev
```

Or start them separately:

```bash
# Terminal 1 — server
npm run dev:server

# Terminal 2 — client
npm run dev:client
```

### 5. Open in browser

| URL                             | What you see         |
|---------------------------------|----------------------|
| `http://localhost:3000`         | Profile Card (view)  |
| `http://localhost:3000/edit`    | Edit Profile form    |
| `http://localhost:5000/api/profile` | Raw JSON API    |

---

## 🗄 Data Storage Setup

Profile data is stored in **`server/src/data/profile.json`** — a plain JSON file that the Express API reads and writes.

**To reset your profile to defaults**, edit this file directly:

```json
{
  "name": "Your Name",
  "title": "Your Job Title",
  "description": "Short bio here...",
  "phone": "+91 98765 43210",
  "email": "you@example.com",
  "location": "City, Country",
  "photo": "https://your-photo-url.jpg",
  "social": {
    "linkedin":  "https://linkedin.com/in/yourhandle",
    "instagram": "https://instagram.com/yourhandle",
    "github":    "https://github.com/yourhandle"
  }
}
```

> **Note:** On serverless platforms (Vercel, Netlify Functions), filesystem writes don't persist across deploys. For those, swap in a free database like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Firebase Firestore](https://firebase.google.com/products/firestore).

---

## 🌐 Deploying to Production

### Option A — Render (Recommended, free tier)

1. Push your code to GitHub (see Git section below).
2. Go to [render.com](https://render.com) → **New Web Service**.
3. Connect your GitHub repo.
4. Fill in settings:
   - **Build Command:** `npm run build` (run from root or configure root dir)
   - **Start Command:** `node server/src/index.js`
   - **Environment:** `Node`
5. Add environment variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
6. Click **Deploy**. Render will run your server, which serves the React build.

### Option B — Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**.
2. Select your repo.
3. Set environment variables same as above.
4. Railway auto-detects the `Procfile` — click Deploy.

### Option C — Heroku

```bash
# Login and create app
heroku login
heroku create your-profile-card-app

# Set env vars
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Open app
heroku open
```

### Option D — VPS (DigitalOcean / AWS EC2 / any Linux server)

```bash
# SSH into your server
ssh user@your-server-ip

# Clone and install
git clone https://github.com/shivamcsprince/profile-card.git
cd profile-card
npm run install:all

# Build the React app
npm run build

# Run with PM2 (process manager)
npm install -g pm2
NODE_ENV=production pm2 start server/src/index.js --name profile-card
pm2 save
pm2 startup
```

Set up Nginx as a reverse proxy on port 80 → 5000:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📤 Pushing to GitHub (Step-by-Step)

### First-time setup

```bash
# 1. Initialize git (skip if already done)
cd profile-card
git init

# 2. Add all files
git add .

# 3. First commit
git commit -m "feat: initial commit — profile card app"

# 4. Create repo on GitHub:
#    Go to https://github.com/new
#    Name it: profile-card
#    Leave it PUBLIC, do NOT initialize with README

# 5. Connect and push
git remote add origin https://github.com/shivamcsprince/profile-card.git
git branch -M main
git push -u origin main
```

### Subsequent changes

```bash
git add .
git commit -m "your commit message"
git push
```

### Suggested commit message convention

```
feat:  add new feature
fix:   fix a bug
style: UI/CSS changes only
refactor: code restructure, no behaviour change
docs:  README or comment updates
```

---

## 🔌 API Reference

### `GET /api/profile`

Returns the current profile data.

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Shivam Prince",
    "title": "Full Stack Developer",
    ...
  }
}
```

---

### `PUT /api/profile`

Updates the profile. Accepts a partial or full profile body.

**Request body:**
```json
{
  "name": "New Name",
  "title": "New Title",
  "social": {
    "github": "https://github.com/newhandle"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...updatedProfile }
}
```

---

## 🧑‍💻 Author

**shivamcsprince**

- GitHub: [@shivamcsprince](https://github.com/shivamcsprince)

---

## 📝 License

MIT © shivamcsprince
