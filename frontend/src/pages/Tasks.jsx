import { useState } from "react";
import { Plus, Trash2, Flag } from "lucide-react";

const Tasks = ({ tasks, setTasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [targetColumn, setTargetColumn] = useState("todo");
  const [form, setForm] = useState({ title: "", priority: "medium" });

  const openAddModal = (column) => {
    setTargetColumn(column);
    setForm({ title: "", priority: "medium" });
    setShowModal(true);
  };

  const handleSaveTask = () => {
    if (!form.title.trim()) return;
    const newTask = { id: Date.now(), title: form.title, priority: form.priority };
    setTasks((prev) => ({
      ...prev,
      [targetColumn]: [newTask, ...prev[targetColumn]],
    }));
    setShowModal(false);
  };

  const handleDeleteTask = (column, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((t) => t.id !== taskId),
    }));
  };

  const onDragStart = (e, fromColumn, taskId) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ fromColumn, taskId }));
  };
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e, toColumn) => {
    e.preventDefault();
    const { fromColumn, taskId } = JSON.parse(e.dataTransfer.getData("text/plain"));
    const movingTask = tasks[fromColumn].find((t) => t.id === taskId);
    if (!movingTask) return;

    setTasks((prev) => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter((t) => t.id !== taskId),
      [toColumn]: [movingTask, ...prev[toColumn]],
    }));
  };

  const columns = [
    { id: "todo", title: "To Do", color: "bg-gray-100" },
    { id: "in-progress", title: "In Progress", color: "bg-blue-100" },
    { id: "review", title: "Review", color: "bg-yellow-100" },
    { id: "done", title: "Done", color: "bg-green-100" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {columns.map((col) => (
          <div
            key={col.id}
            className={`flex flex-col rounded-xl p-4 min-h-[250px] ${col.color}`}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, col.id)}
          >
            {/* Column Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">{col.title}</h2>
              <button
                onClick={() => openAddModal(col.id)}
                className="p-1 bg-white rounded-full shadow hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-3">
              {tasks[col.id].map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3 rounded-lg shadow cursor-move flex justify-between items-start hover:shadow-lg transition"
                  draggable
                  onDragStart={(e) => onDragStart(e, col.id, task.id)}
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      <Flag className="w-3 h-3 mr-1" /> {task.priority}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(col.id, task.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-80 p-6">
            <h3 className="text-lg font-bold mb-4">Add Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTask}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;


