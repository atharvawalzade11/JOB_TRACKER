# 🗂️ JobTrackr — MERN Job Application Tracker

A full-stack job application tracking app built with MongoDB, Express, React (Vite), and Node.js.

---

## 📁 Project Structure

```
job-tracker/
├── server/                   # Node.js + Express backend
│   ├── controllers/
│   │   ├── authController.js
│   │   └── jobsController.js
│   ├── middleware/
│   │   └── auth.js           # JWT middleware
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── jobs.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── client/                   # React + Vite frontend
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── context/          # Auth context
    │   ├── hooks/            # useJobs, useToast
    │   ├── pages/            # Login, Signup, Dashboard, Jobs
    │   └── utils/            # Axios instance
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

- **Node.js** v18+ → https://nodejs.org
- **npm** v9+ (comes with Node)
- **MongoDB** (local or Atlas)

---

## 🗄️ MongoDB Setup

### Option A — Local MongoDB
1. Install MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Start the service:
   ```bash
   # macOS (Homebrew)
   brew services start mongodb-community

   # Linux (systemd)
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```
3. Your connection string: `mongodb://localhost:27017/job-tracker`

### Option B — MongoDB Atlas (Free Cloud)
1. Create free account at https://cloud.mongodb.com
2. Create a new cluster (free M0 tier)
3. Create a database user under **Database Access**
4. Whitelist your IP under **Network Access** (or use `0.0.0.0/0`)
5. Click **Connect → Drivers** and copy your connection string
6. Replace `MONGO_URI` in `server/.env` with your Atlas URI

---

## 🚀 Running the App

### Step 1 — Configure environment variables

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-tracker
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRE=7d
```

### Step 2 — Install & run the backend

```bash
cd job-tracker/server
npm install
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Step 3 — Install & run the frontend

Open a **new terminal**:

```bash
cd job-tracker/client
npm install
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

### Step 4 — Open the app

Visit **http://localhost:5173** in your browser.

1. Click **"Create one free"** to sign up
2. Log in with your credentials
3. Start adding job applications!

---

## 🔌 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |

### Jobs — `/api/jobs` (all protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs (supports `?status=&search=`) |
| POST | `/api/jobs` | Create new job |
| PUT | `/api/jobs/:id` | Update job |
| DELETE | `/api/jobs/:id` | Delete job |
| GET | `/api/jobs/stats` | Get status statistics |

---

## ✨ Features

- **JWT Authentication** — secure login/signup with bcrypt password hashing
- **Dashboard** — live stats + doughnut & bar charts
- **Job Management** — add, edit, delete applications
- **Filters** — filter by status (Applied / Interview / Offer / Rejected)
- **Search** — search by company name
- **Dual View** — grid cards or table view
- **Toast Notifications** — success/error feedback
- **Responsive Design** — works on mobile and desktop
- **Loading States** — skeleton loaders and spinners

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Charts | Chart.js + react-chartjs-2 |
| HTTP Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Routing | React Router v6 |
