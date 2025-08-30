
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  CheckSquare, 
  Palette, 
  MessageCircle
} from 'lucide-react';
import AuthContext from '../contexts/AuthContext';
import Card from '../components/common/Card';
import { useContext } from 'react';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const quickActions = [
    {
      name: 'Generate Ideas',
      description: 'Use AI to brainstorm new ideas',
      href: '/ideas',
      icon: Lightbulb,
      color: 'bg-yellow-500'
    },
    {
      name: 'View Tasks',
      description: 'Check your current tasks',
      href: '/tasks',
      icon: CheckSquare,
      color: 'bg-green-500'
    },
    {
      name: 'Open Whiteboard',
      description: 'Start visual collaboration',
      href: '/whiteboard',
      icon: Palette,
      color: 'bg-purple-500'
    },
    {
      name: 'Team Chat',
      description: 'Connect with your team',
      href: '/chat',
      icon: MessageCircle,
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.name} hover className="p-6">
                <Link to={action.href} className="block">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${action.color} p-3 rounded-full mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {action.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
