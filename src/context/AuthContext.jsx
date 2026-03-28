import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('sweet_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sweet_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const login = (email, password) => {
    // Mock authentication
    if (email === 'admin@sweets.com' && password === 'admin123') {
      const adminUser = { email, role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('sweet_user', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sweet_user');
  };

  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id, status) => {
    setInquiries(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, inquiries, addInquiry, updateInquiryStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
