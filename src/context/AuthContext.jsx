import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'https://master-engineering-api.vercel.app';
export const ADMIN_EMAILS = [
  'masterengineeringworks@gmail.com',
  'iqra03010511199@gmail.com',
];

export const isAdminUser = (user) => {
  const email = (user?.email || '').trim().toLowerCase();
  return user?.role?.toLowerCase() === 'admin' || ADMIN_EMAILS.includes(email);
};

const readResponse = async (response) => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text };
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // App load hone par checking
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 1. User Register Function
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  // 2. User Login Function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      // User state aur localStorage update
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Unable to reach the server. Please try again.');
      }
      throw error;
    }
  };

  // 3. Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const requestPasswordReset = async (email) => {
  const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(data.message || 'Unable to send the reset link. Please try again.');
  }

  return data;
};