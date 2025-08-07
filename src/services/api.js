// API configuration and utilities for backend integration
// This file contains placeholder functions for future API integration

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to make HTTP requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  auth = {
    login: async (credentials) => {
      return this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },

    register: async (userData) => {
      return this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },

    logout: async () => {
      return this.request('/auth/logout', {
        method: 'POST',
      });
    },

    refreshToken: async () => {
      return this.request('/auth/refresh', {
        method: 'POST',
      });
    },
  };

  // Ideas endpoints
  ideas = {
    getAll: async (filters = {}) => {
      const query = new URLSearchParams(filters).toString();
      return this.request(`/ideas${query ? `?${query}` : ''}`);
    },

    getById: async (id) => {
      return this.request(`/ideas/${id}`);
    },

    create: async (ideaData) => {
      return this.request('/ideas', {
        method: 'POST',
        body: JSON.stringify(ideaData),
      });
    },

    update: async (id, updates) => {
      return this.request(`/ideas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },

    delete: async (id) => {
      return this.request(`/ideas/${id}`, {
        method: 'DELETE',
      });
    },

    generateWithAI: async (prompt) => {
      return this.request('/ideas/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
    },
  };

  // Tasks endpoints
  tasks = {
    getAll: async (filters = {}) => {
      const query = new URLSearchParams(filters).toString();
      return this.request(`/tasks${query ? `?${query}` : ''}`);
    },

    getById: async (id) => {
      return this.request(`/tasks/${id}`);
    },

    create: async (taskData) => {
      return this.request('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
      });
    },

    update: async (id, updates) => {
      return this.request(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },

    delete: async (id) => {
      return this.request(`/tasks/${id}`, {
        method: 'DELETE',
      });
    },
  };

  // Chat endpoints
  chat = {
    getChannels: async () => {
      return this.request('/chat/channels');
    },

    getMessages: async (channelId, options = {}) => {
      const query = new URLSearchParams(options).toString();
      return this.request(`/chat/channels/${channelId}/messages${query ? `?${query}` : ''}`);
    },

    sendMessage: async (channelId, message) => {
      return this.request(`/chat/channels/${channelId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
    },
  };

  // Admin endpoints
  admin = {
    getUsers: async (filters = {}) => {
      const query = new URLSearchParams(filters).toString();
      return this.request(`/admin/users${query ? `?${query}` : ''}`);
    },

    updateUserRole: async (userId, role) => {
      return this.request(`/admin/users/${userId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
      });
    },

    getStats: async () => {
      return this.request('/admin/stats');
    },
  };

  // Whiteboard endpoints (future implementation)
  whiteboard = {
    getBoards: async () => {
      return this.request('/whiteboards');
    },

    getBoard: async (id) => {
      return this.request(`/whiteboards/${id}`);
    },

    createBoard: async (boardData) => {
      return this.request('/whiteboards', {
        method: 'POST',
        body: JSON.stringify(boardData),
      });
    },

    updateBoard: async (id, updates) => {
      return this.request(`/whiteboards/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
  };
}

export default new ApiService();
