
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/common/Button";
import Tasks from "./Tasks"; // reuse your Kanban board

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [selectedProject, setSelectedProject] = useState(null);

  // 🔹 Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // ✅ backend sends { projects: [...] }
        setProjects(res.data.projects);
      } catch (err) {
        console.error("❌ Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, []);

  // 🔹 Create project
  const handleCreateProject = async () => {
    if (!newProject.name.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/projects",
        newProject,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // ✅ backend sends { project: {...} }
      setProjects((prev) => [...prev, res.data.project]);
      setNewProject({ name: "", description: "" });
    } catch (err) {
      console.error("❌ Failed to create project:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create project");
    }
  };

  // 🔹 Delete project
  const handleDeleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
      if (selectedProject?._id === id) setSelectedProject(null);
    } catch (err) {
      console.error("❌ Failed to delete project", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      {/* ➕ New Project Form */}
      <div className="flex gap-2">
        <input
          value={newProject.name}
          onChange={(e) =>
            setNewProject((p) => ({ ...p, name: e.target.value }))
          }
          placeholder="Project name"
          className="px-3 py-2 border rounded w-1/3"
        />
        <input
          value={newProject.description}
          onChange={(e) =>
            setNewProject((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="Description"
          className="px-3 py-2 border rounded flex-1"
        />
        <Button onClick={handleCreateProject}>Add Project</Button>
      </div>

      {/* 📋 Project List */}
      <ul className="space-y-2">
        {projects.map((p) => (
          <li
            key={p._id}
            className={`p-3 border rounded flex justify-between items-center cursor-pointer ${
              selectedProject?._id === p._id
                ? "bg-primary-100 dark:bg-primary-800"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setSelectedProject(p)}
          >
            <div>
              <strong>{p.name}</strong>
              {p.description && <span className="ml-2 text-sm">{p.description}</span>}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent selecting when deleting
                handleDeleteProject(p._id);
              }}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* 📌 Selected Project → Show Tasks board */}
      {selectedProject && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Tasks for: {selectedProject.name}
          </h2>
          <Tasks projectId={selectedProject._id} />
        </div>
      )}
    </div>
  );
};

export default Projects;

