import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  CheckSquare, 
  Palette, 
  MessageCircle, 
  TrendingUp,
  Users,
  Clock,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const DashboardHome = () => {
  const { user } = useAuth();

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

  const recentActivity = [
    {
      id: 1,
      type: 'idea',
      title: 'AI-Powered Task Automation',
      time: '2 hours ago',
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'task',
      title: 'Design new user interface',
      time: '4 hours ago',
      user: 'Jane Smith'
    },
    {
      id: 3,
      type: 'chat',
      title: 'Team discussed sprint planning',
      time: '6 hours ago',
      user: 'Mike Johnson'
    }
  ];

  const stats = [
    {
      name: 'Ideas Generated',
      value: '24',
      change: '+12%',
      icon: Lightbulb
    },
    {
      name: 'Tasks Completed',
      value: '18',
      change: '+8%',
      icon: CheckSquare
    },
    {
      name: 'Team Members',
      value: '12',
      change: '+2',
      icon: Users
    },
    {
      name: 'Active Projects',
      value: '5',
      change: '+1',
      icon: Star
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upcoming Deadlines
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  UI Design Review
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tomorrow, 2:00 PM
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                High
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Sprint Planning
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Friday, 10:00 AM
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Medium
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Client Presentation
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Next Monday, 3:00 PM
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                Critical
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
