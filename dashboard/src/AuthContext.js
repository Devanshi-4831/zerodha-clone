import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Track authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in user
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to log out user
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => {
  return useContext(AuthContext);
};

