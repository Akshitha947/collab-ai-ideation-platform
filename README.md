# CollabAI - AI-Powered Project Management Platform

A beautiful, responsive frontend scaffold for a collaborative AI-powered project management platform built with React 18, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: React 18, Vite, Tailwind CSS, React Router v6
- **Authentication**: Complete login/register flow with role-based access
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode**: Full dark mode support with system preference detection
- **AI Integration Ready**: Components designed for AI features integration
- **Role-Based Access**: Admin, Manager, and User roles with appropriate permissions

## 📱 Pages & Features

### Authentication
- **Login Page** (`/login`) - Clean login form with demo credentials
- **Register Page** (`/register`) - User registration with validation

### Main Application (Protected Routes)
- **Dashboard** (`/dashboard`) - Welcome screen with stats, quick actions, and activity feed
- **Ideas** (`/ideas`) - AI-powered idea generation and management with grid layout
- **Tasks** (`/tasks`) - Kanban board for task management with drag-and-drop ready UI
- **Whiteboard** (`/whiteboard`) - Coming soon placeholder with toolbar mockup
- **Chat** (`/chat`) - Team chat interface with channels and direct messages
- **Admin** (`/admin`) - User management page (Admin only)

### UI Components
- **Layout**: Collapsible sidebar with responsive navigation
- **Topbar**: User avatar, notifications, dark mode toggle, logout
- **Reusable Components**: Button, Card, Input, Spinner components
- **Toast Notifications**: React Toastify integration

## 🎨 Design System

- **Primary Colors**: Blue color palette with dark mode variants
- **Typography**: Clean, readable font hierarchy
- **Icons**: Lucide React icon library
- **Components**: Tailwind CSS with custom component classes
- **Spacing**: Consistent spacing system using Tailwind utilities

## 🔐 Demo Credentials

The app includes demo users for testing different roles:

- **Admin**: `admin@example.com` / `admin123`
- **Manager**: `manager@example.com` / `manager123`  
- **User**: `user@example.com` / `user123`

## 🛠 Installation & Setup

1. **Clone or extract the project**
   ```bash
   cd collab-ai-ideation-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/                 # Static assets (logos, icons)
├── components/
│   ├── layout/            # Sidebar, Topbar, LayoutWrapper
│   ├── auth/              # LoginForm, RegisterForm
│   └── common/            # Button, Input, Card, Spinner
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardHome.jsx
│   ├── Ideas.jsx
│   ├── Tasks.jsx
│   ├── Whiteboard.jsx
│   ├── Chat.jsx
│   └── Admin.jsx
├── contexts/
│   └── AuthContext.jsx     # Authentication state management
├── services/
│   └── api.js             # API service utilities (ready for backend)
├── utils/
│   ├── ProtectedRoute.jsx # Route protection
│   └── roleBasedRedirect.jsx # Role-based navigation
├── App.jsx                # Main app component with routing
└── main.jsx              # App entry point
```

## 🎯 Key Features Implemented

### Authentication & Authorization
- ✅ Context-based auth state management
- ✅ Protected routes with automatic redirects
- ✅ Role-based access control (Admin, Manager, User)
- ✅ Persistent login sessions with localStorage
- ✅ Form validation and error handling

### User Interface
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode support with toggle
- ✅ Clean, modern design following best practices
- ✅ Loading states and error handling
- ✅ Toast notifications for user feedback

### Navigation & Layout
- ✅ Collapsible sidebar navigation
- ✅ Breadcrumb-ready topbar
- ✅ Mobile-friendly hamburger menu
- ✅ Active navigation state indicators

### Page Functionality
- ✅ Dashboard with stats, quick actions, and recent activity
- ✅ Ideas page with AI prompt input and card-based layout
- ✅ Tasks page with Kanban board structure
- ✅ Chat interface with channels and messaging UI
- ✅ Admin panel with user management table
- ✅ Whiteboard placeholder with toolbar mockup

## 🔧 Customization

### Styling
- Modify `tailwind.config.js` to change colors, fonts, spacing
- Update `src/index.css` for global styles and component classes
- Component-specific styling in individual component files

### Routes & Navigation
- Add new routes in `src/App.jsx`
- Update sidebar navigation in `src/components/layout/Sidebar.jsx`
- Modify role-based access in `src/utils/roleBasedRedirect.jsx`

### API Integration
- Ready-to-use API service in `src/services/api.js`
- Update `AuthContext.jsx` to connect to real backend
- Replace dummy data in pages with API calls

## 📦 Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v6**: Client-side routing
- **Lucide React**: Beautiful icon library
- **React Toastify**: Toast notifications
- **@tailwindcss/forms**: Better form styling

## 🚀 Next Steps (Phase 2)

This scaffold is ready for backend integration. Next steps would include:

1. **Backend API**: Connect to Express.js/Node.js backend
2. **Real Authentication**: JWT tokens, password hashing
3. **Database Integration**: User data, ideas, tasks, chat messages
4. **AI Features**: OpenAI integration for idea generation
5. **Real-time Features**: WebSocket chat, live collaboration
6. **File Upload**: Profile pictures, file attachments
7. **Advanced Features**: Search, filters, notifications
8. **Whiteboard**: Canvas drawing and real-time collaboration

## 📄 License

This project is created as a frontend scaffold and is ready for production use with proper backend integration.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
