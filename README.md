# 🚀 Collaborative AI-Powered Ideation & Project Management Platform

An advanced platform enabling teams to brainstorm, organize, and manage projects with AI-powered idea generation and collaboration tools.

---

## 📂 Project Structure
```bash
collab-ai-ideation-platform/
├── backend/                # Node.js + Express backend
│   ├── config/             # DB and JWT configs
│   ├── controllers/        # API route controllers
│   ├── middlewares/        # Auth, error handling
│   ├── models/             # MongoDB models
│   ├── routes/             # Express route handlers
│   ├── server.js           # Backend entry point
│   └── package.json        # Backend dependencies
│
├── frontend/               # React (Vite) frontend
│   ├── src/                # React source files
│   │   ├── components/     # UI components
│   │   ├── contexts/       # Context API providers
│   │   ├── pages/          # App pages
│   │   ├── App.jsx         # Root component
│   │   └── main.jsx        # React entry point
│   └── package.json        # Frontend dependencies
│
├── README.md               # Documentation
└── .gitignore
```

---

## ⚙️ Tech Stack

### 🔹 Backend
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication  
- Role-Based Access Control  
- Google Gemini API (AI-powered ideation)  

### 🔹 Frontend
- React (Vite)  
- Tailwind CSS + shadcn/ui  
- React Router  
- Lucide Icons  
- Context API for state management  

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd collab-ai-ideation-platform
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside **backend/**:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

Run the backend:
```bash
npm run dev
```
➡️ Backend runs at: **http://localhost:5000**

---

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file inside **frontend/**:
```env
VITE_API_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```
➡️ Frontend runs at: **http://localhost:5173**

---

## 🔑 Core Features
- ✅ Authentication & RBAC – Secure login, JWT tokens, roles (admin, user)  
- ✅ AI-Powered Ideation – Generate project ideas using Gemini API  
- ✅ Project Management – Create projects, assign tasks, manage workflows  
- ✅ Team Collaboration – Comments, chat, discussions  
- ✅ Analytics Dashboard – Insights on projects & tasks  
- ✅ Modern UI – Tailwind + shadcn/ui + responsive layout  

---

## 📊 API Endpoints (Examples)
```http
POST /api/auth/register     → Register user
POST /api/auth/login        → Login & get JWT
GET  /api/projects          → Fetch all projects
POST /api/projects          → Create project
POST /api/ai/generate       → AI idea generation
GET  /api/analytics         → Dashboard analytics
```

---

## 🚀 Future Enhancements
- 🔔 Real-time notifications (WebSockets)  
- 📂 File sharing inside projects  
- 🤖 Advanced AI project recommendations  

---

## 👨‍💻 Developer Notes
✨ Built with modern web technologies to boost collaboration and innovation.
