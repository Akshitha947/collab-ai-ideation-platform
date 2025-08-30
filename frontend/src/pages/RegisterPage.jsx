import { useState,useContext } from 'react';
import { Navigate } from 'react-router-dom';
import  AuthContext from '../contexts/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useContext(AuthContext);;

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegister = async (formData) => {
    setLoading(true);
    try {
      const result = await register(formData);
      if (result.success) {
        // Redirect handled by the context and route protection
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm onSubmit={handleRegister} loading={loading} />
    </div>
  );
};

export default RegisterPage;
