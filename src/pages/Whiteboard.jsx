import { Palette, Brush, Square, Circle, Type, Eraser } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Whiteboard = () => {
  const tools = [
    { icon: Brush, name: 'Brush', active: true },
    { icon: Square, name: 'Rectangle', active: false },
    { icon: Circle, name: 'Circle', active: false },
    { icon: Type, name: 'Text', active: false },
    { icon: Eraser, name: 'Eraser', active: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Whiteboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Collaborative visual workspace for brainstorming and planning
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            Share Board
          </Button>
          <Button>
            New Board
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.name}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    tool.active
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
          
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Color:</span>
            <div className="flex space-x-1">
              {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'].map((color) => (
                <button
                  key={color}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              defaultValue="3"
              className="w-20"
            />
          </div>
        </div>
      </Card>

      {/* Canvas Area */}
      <Card className="p-0 overflow-hidden min-h-96">
        <div className="relative w-full h-96 bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600">
          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                Interactive whiteboard with real-time collaboration features is currently under development.
              </p>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time collaboration</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Drawing tools & shapes</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Templates & sticky notes</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Export & sharing options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Boards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Boards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} hover className="p-4 cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-3 flex items-center justify-center">
                <Palette className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Project Board {i}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last modified {i} days ago
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
