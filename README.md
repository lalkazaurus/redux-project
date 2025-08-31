# 📚 Learning Platform

A full-stack learning management platform with authentication, user management, and lesson scheduling.

## ✨ Features

* **User Authentication** (Register, Login, Logout with session cookies)
* **User Management** (View all users, update username, delete users)
* **Lesson Management** (CRUD operations for lessons: create, update, delete, fetch by surname)
* **Frontend** built with React + Vite + TypeScript
* **Backend** built with Express + TypeScript + MongoDB (Mongoose)
* **Middleware** for authentication and authorization
* **CORS** configuration with client/server separation

## 🛠️ Tech Stack

### Backend

* Node.js + Express
* MongoDB + Mongoose
* TypeScript
* Cookie-based Authentication
* Jest (testing)

### Frontend

* React 18
* React Router DOM v7
* Vite
* TypeScript

## 🚀 Getting Started

### Prerequisites

* Node.js 22+
* npm or yarn
* MongoDB instance running locally or in the cloud (Atlas)

### Installation

Clone the repository and install dependencies for both backend and frontend:

```bash
git clone https://github.com/lalkazaurus/redux-project.git
cd learning-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the **backend** folder:

```env
MONGO_URI=mongodb://localhost:27017/learning-platform
SECRET=yourSecretKey
CLIENT_URL=http://localhost:5173
```

### Running the Backend

```bash
cd backend
npm run dev
```

Backend runs by default on **[http://localhost:5000](http://localhost:5000)**

### Running the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs by default on **[http://localhost:5173](http://localhost:5173)**

## 📡 API Endpoints

### Authentication

* `POST /auth/register` → Register new user `{ username, email, password }`
* `POST /auth/login` → Login with credentials `{ email, password }`
* `POST /auth/logout` → Logout user

### Users

* `GET /users` → Get all users (requires authentication)
* `PATCH /users/:id` → Update username (requires ownership)
* `DELETE /users/:id` → Delete user (requires ownership)

### Lessons

* `GET /lessons` → Get all lessons
* `GET /lessons/:surname` → Get lessons by teacher surname
* `POST /lessons` → Create new lesson `{ id, surname, date, link, time }`
* `PUT /lessons/:id` → Update lesson
* `DELETE /lessons/:id` → Delete lesson

## 🗂️ Project Structure

```bash
learning-platform/
├── backend/
│   ├── config/db.ts          # Database connection
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Auth, CORS, etc.
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── index.ts              # Entry point
│   └── package.json
├── frontend/
│   ├── pages/                # React pages (Main, NotFound)
│   ├── router/Router.tsx     # React Router config
│   ├── App.tsx
│   ├── main.tsx
│   └── package.json
└── README.md                 # Project documentation
```

## 🧪 Testing

Backend tests are written using Jest:

```bash
cd backend
npm run test
```

## 📌 Notes

* Backend uses **session cookies** (`Auth`) for authentication.
* Make sure **MongoDB is running** before starting the backend.
* Adjust `CLIENT_URL` in `.env` if frontend runs on a different port.

---

✅ This README covers both **frontend** and **backend** setup, API routes, and project structure.
