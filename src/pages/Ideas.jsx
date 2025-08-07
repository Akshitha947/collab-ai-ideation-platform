import { useState } from 'react';
import { Lightbulb, Plus, Star, Users, Calendar, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Ideas = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy ideas data
  const ideas = [
    {
      id: 1,
      title: 'AI-Powered Customer Support Bot',
      description: 'Develop an intelligent chatbot that can handle customer inquiries 24/7 using natural language processing.',
      tags: ['AI', 'Customer Service', 'Automation'],
      likes: 12,
      author: 'Sarah Johnson',
      createdAt: '2024-01-15',
      status: 'draft'
    },
    {
      id: 2,
      title: 'Smart Home Energy Management',
      description: 'Create a system that optimizes energy consumption in homes using IoT sensors and machine learning.',
      tags: ['IoT', 'Energy', 'Smart Home'],
      likes: 8,
      author: 'Mike Chen',
      createdAt: '2024-01-14',
      status: 'approved'
    },
    {
      id: 3,
      title: 'Virtual Reality Training Platform',
      description: 'Build a VR platform for professional training simulations across various industries.',
      tags: ['VR', 'Training', 'Education'],
      likes: 15,
      author: 'Alex Rodriguez',
      createdAt: '2024-01-13',
      status: 'in-progress'
    },
    {
      id: 4,
      title: 'Blockchain Supply Chain Tracker',
      description: 'Implement a transparent supply chain tracking system using blockchain technology.',
      tags: ['Blockchain', 'Supply Chain', 'Transparency'],
      likes: 6,
      author: 'Emma Davis',
      createdAt: '2024-01-12',
      status: 'draft'
    }
  ];

  const handleGenerateIdea = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    // Simulate AI API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setPrompt('');
    // In a real app, this would add the generated idea to the list
  };

  const filteredIdeas = ideas.filter(idea =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'draft':
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Ideas
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Generate and collaborate on innovative ideas with AI assistance
          </p>
        </div>
      </div>

      {/* AI Prompt Section */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Generate New Ideas
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what kind of ideas you're looking for... (e.g., 'innovative mobile app features for productivity')"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            />
          </div>
          <Button 
            onClick={handleGenerateIdea}
            loading={loading}
            disabled={!prompt.trim() || loading}
            className="w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate Ideas with AI
          </Button>
        </div>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ideas..."
              className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            All Status
          </Button>
          <Button variant="outline" size="sm">
            Filter by Tags
          </Button>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <Card key={idea.id} hover className="p-6 flex flex-col">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {idea.title}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(idea.status)} capitalize`}>
                  {idea.status}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {idea.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {idea.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(idea.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                <Star className="w-4 h-4" />
                <span>{idea.likes}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
