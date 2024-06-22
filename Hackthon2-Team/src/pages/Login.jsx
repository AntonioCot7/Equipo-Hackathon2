import React from 'react';
import LoginForm from '../components/LoginForm';
import { login, getUserRole } from '../services/api';

const Login = () => {
  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      const token = response.token;
      localStorage.setItem('token', token);

      const roleResponse = await getUserRole(token);
      const role = roleResponse.role;
      localStorage.setItem('role', role);

      console.log('Login successful:', response);
      console.log('User role:', role);

      // Redirigir según el rol
      if (role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/client-dashboard';
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
