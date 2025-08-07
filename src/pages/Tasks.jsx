import { useState } from 'react';
import { Plus, MoreVertical, User, Calendar, Flag, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy tasks data organized by status
  const initialTasks = {
    todo: [
      {
        id: 1,
        title: 'Design user authentication flow',
        description: 'Create wireframes and mockups for login/signup process',
        priority: 'high',
        assignee: 'Sarah Johnson',
        dueDate: '2024-01-20',
        tags: ['Design', 'UX']
      },
      {
        id: 2,
        title: 'Research competitor features',
        description: 'Analyze top 5 competitors and document key features',
        priority: 'medium',
        assignee: 'Mike Chen',
        dueDate: '2024-01-22',
        tags: ['Research']
      }
    ],
    'in-progress': [
      {
        id: 3,
        title: 'Implement AI suggestion engine',
        description: 'Build the backend logic for AI-powered idea suggestions',
        priority: 'high',
        assignee: 'Alex Rodriguez',
        dueDate: '2024-01-18',
        tags: ['Development', 'AI']
      },
      {
        id: 4,
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        priority: 'medium',
        assignee: 'Emma Davis',
        dueDate: '2024-01-25',
        tags: ['DevOps']
      }
    ],
    review: [
      {
        id: 5,
        title: 'Database schema optimization',
        description: 'Optimize queries and indexes for better performance',
        priority: 'low',
        assignee: 'John Smith',
        dueDate: '2024-01-16',
        tags: ['Database']
      }
    ],
    done: [
      {
        id: 6,
        title: 'User feedback collection system',
        description: 'Implemented feedback modal and storage system',
        priority: 'medium',
        assignee: 'Lisa Wang',
        dueDate: '2024-01-15',
        tags: ['Development', 'Feedback']
      },
      {
        id: 7,
        title: 'Mobile responsiveness testing',
        description: 'Tested app on various mobile devices and screen sizes',
        priority: 'high',
        assignee: 'Tom Brown',
        dueDate: '2024-01-14',
        tags: ['Testing', 'Mobile']
      }
    ]
  };

  const [tasks, setTasks] = useState(initialTasks);
  
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-700' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100 dark:bg-yellow-900' },
    { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your project tasks with our Kanban board
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            All Priorities
          </Button>
          <Button variant="outline" size="sm">
            All Assignees
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-96">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className={`${column.color} rounded-lg p-4 mb-4`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {column.title}
                </h3>
                <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                  {tasks[column.id].length}
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-3">
              {tasks[column.id].map((task) => (
                <Card
                  key={task.id}
                  hover
                  className="p-4 cursor-move transition-all duration-200 hover:shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Task Header */}
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                        {task.title}
                      </h4>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Task Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2">
                        {/* Priority */}
                        <div className="flex items-center">
                          <Flag className="w-3 h-3 mr-1" />
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      {/* Due Date and Assignee */}
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span className={isOverdue(task.dueDate) ? 'text-red-600 dark:text-red-400' : ''}>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span className="truncate max-w-16">
                            {task.assignee.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Add Task Button */}
              <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Plus className="w-4 h-4 mx-auto mb-1" />
                <span className="text-sm">Add Task</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
