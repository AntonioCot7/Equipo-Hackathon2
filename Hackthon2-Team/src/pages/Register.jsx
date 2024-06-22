import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { register, getUserRole } from '../services/api';

const Register = () => {
  const handleRegister = async (name, email, password) => {
    try {
      const response = await register(name, email, password);
      const token = response.token;
      localStorage.setItem('token', token);

      const roleResponse = await getUserRole(token);
      const role = roleResponse.role;
      localStorage.setItem('role', role);

      console.log('Registration successful:', response);
      console.log('User role:', role);

      // Redirigir según el rol
      if (role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/client-dashboard';
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default Register;
