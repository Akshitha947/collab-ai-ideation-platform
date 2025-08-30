import  AuthContext from '../contexts/AuthContext';

export const useRoleBasedRedirect = () => {
  const { user } = AuthContext();

  const getDefaultRoute = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'manager':
        return '/dashboard';
      case 'user':
      default:
        return '/dashboard';
    }
  };

  const canAccessRoute = (route) => {
    if (!user) return false;

    // Admin can access everything
    if (user.role === 'admin') return true;

    // Manager restrictions
    if (user.role === 'manager') {
      return route !== '/admin';
    }

    // User restrictions
    if (user.role === 'user') {
      return !['admin'].includes(route.replace('/', ''));
    }

    return true;
  };

  return {
    getDefaultRoute,
    canAccessRoute
  };
};
