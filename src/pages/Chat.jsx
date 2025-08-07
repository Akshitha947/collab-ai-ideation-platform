import { useState } from 'react';
import { Send, Smile, Paperclip, MoreVertical, Users, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [message, setMessage] = useState('');

  const channels = [
    { id: 'general', name: 'General', unread: 0, type: 'channel' },
    { id: 'development', name: 'Development', unread: 3, type: 'channel' },
    { id: 'design', name: 'Design', unread: 1, type: 'channel' },
    { id: 'ai-discussions', name: 'AI Discussions', unread: 0, type: 'channel' }
  ];

  const directMessages = [
    { id: 'sarah', name: 'Sarah Johnson', online: true, unread: 2 },
    { id: 'mike', name: 'Mike Chen', online: true, unread: 0 },
    { id: 'alex', name: 'Alex Rodriguez', online: false, unread: 1 },
    { id: 'emma', name: 'Emma Davis', online: true, unread: 0 }
  ];

  const messages = [
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      message: 'Hey everyone! Just finished the new user interface mockups. What do you think?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      user: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      message: 'They look great! The color scheme really works well with our brand.',
      timestamp: '10:32 AM',
      isOwn: false
    },
    {
      id: 3,
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      message: 'I agree! The AI-powered suggestions feature is going to be amazing. When can we start implementation?',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: 4,
      user: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      message: 'I can start working on the backend API this week. Should have the first version ready by Friday.',
      timestamp: '10:37 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-4">
        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </Card>

        {/* Channels */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Channels</h3>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                  selectedChannel === channel.id
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span># {channel.name}</span>
                {channel.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Direct Messages */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Direct Messages</h3>
          <div className="space-y-1">
            {directMessages.map((dm) => (
              <button
                key={dm.id}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    {dm.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{dm.name}</span>
                </div>
                {dm.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                    {dm.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                # {channels.find(c => c.id === selectedChannel)?.name || 'General'}
              </h2>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>4 members</span>
              </div>
            </div>
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex space-x-3 ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.user}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className={`flex-1 max-w-xs lg:max-w-md ${msg.isOwn ? 'text-right' : ''}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {msg.user}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      msg.isOwn
                        ? 'bg-primary-600 text-white ml-auto'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                />
                <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-3 py-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
