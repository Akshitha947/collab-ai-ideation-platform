
import { useMemo } from "react";

const Analytics = ({ tasks }) => {
  const totalTasks = useMemo(
    () => Object.values(tasks).reduce((sum, arr) => sum + arr.length, 0),
    [tasks]
  );

  const tasksPerColumn = useMemo(() => {
    const result = {};
    Object.keys(tasks).forEach((col) => {
      result[col] = tasks[col].length;
    });
    return result;
  }, [tasks]);

  const tasksPerPriority = useMemo(() => {
    const priorities = { high: 0, medium: 0, low: 0 };
    Object.values(tasks)
      .flat()
      .forEach((t) => {
        if (t.priority) priorities[t.priority] = (priorities[t.priority] || 0) + 1;
      });
    return priorities;
  }, [tasks]);

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      {/* Total Tasks */}
      <div className="p-4 rounded-lg shadow bg-white">
        <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
        <p className="text-2xl font-bold">{totalTasks}</p>
      </div>

      {/* Tasks per Column */}
      <div className="p-4 rounded-lg shadow bg-white">
        <h2 className="text-xl font-semibold mb-2">Tasks per Column</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div
              key={col.id}
              className="p-3 rounded-lg bg-gray-100 flex flex-col items-center"
            >
              <span className="font-medium">{col.title}</span>
              <span className="text-xl font-bold">{tasksPerColumn[col.id]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks per Priority */}
      <div className="p-4 rounded-lg shadow bg-white">
        <h2 className="text-xl font-semibold mb-2">Tasks per Priority</h2>
        <div className="flex gap-4">
          <div className="p-3 rounded-lg bg-red-100 flex-1 text-center">
            <span className="block font-medium">High</span>
            <span className="text-xl font-bold">{tasksPerPriority.high}</span>
          </div>
          <div className="p-3 rounded-lg bg-yellow-100 flex-1 text-center">
            <span className="block font-medium">Medium</span>
            <span className="text-xl font-bold">{tasksPerPriority.medium}</span>
          </div>
          <div className="p-3 rounded-lg bg-green-100 flex-1 text-center">
            <span className="block font-medium">Low</span>
            <span className="text-xl font-bold">{tasksPerPriority.low}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
