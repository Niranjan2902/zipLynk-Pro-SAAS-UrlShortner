import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom'; // Add useLocation

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8001/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/dashboard');
      setUser({ role: res.data.userRole || 'free', email: res.data.email, urlCount: res.data.urlCount });
    } catch (err) {
      setUser(null); // Explicitly handle 401 or other errors
    } finally {
      setLoading(false); // Move to finally to ensure loading is set
    }
  };

  const login = async (email, password) => {
    const res = await axios.post('/user/login', { email, password });
    await fetchUser();
    return res.data;
  };

  const signup = async (name, email, password) => {
    const res = await axios.post('/user', { name, email, password });
    await fetchUser();
    return res.data;
  };

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// New: ProtectedRoute component to handle auth checks
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loader component
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};