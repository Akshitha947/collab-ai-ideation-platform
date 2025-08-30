
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { AuthProvider } from "./contexts/AuthContext";

// Components
import LayoutWrapper from "./components/layout/LayoutWrapper";
import ProtectedRoute from "./utils/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardHome from "./pages/DashboardHome";
import Ideas from "./pages/Ideas";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Whiteboard from "./pages/Whiteboard";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import Projects from "./pages/Projects";

function App() {
  // Single source of truth for tasks
  const [tasks, setTasks] = useState({
    todo: [],
    "in-progress": [],
    review: [],
    done: [],
  });

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes with layout */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <LayoutWrapper>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<DashboardHome />} />
                      <Route path="/ideas" element={<Ideas />} />
                      <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
                      <Route path="/analytics" element={<Analytics tasks={tasks} />} />
                      <Route path="/whiteboard" element={<Whiteboard />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/projects" element={<Projects />} />

                      {/* Catch all route */}
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </LayoutWrapper>
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* Toast notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={document.documentElement.classList.contains("dark") ? "dark" : "light"}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
