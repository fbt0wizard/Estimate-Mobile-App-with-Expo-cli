import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();
const UpdateAuth = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={isLoggedIn}>
      <UpdateAuth.Provider value={toggleAuth}>{children}</UpdateAuth.Provider>
    </AuthContext.Provider>
  );
};

export const auth = () => {
  return useContext(AuthContext);
};

export const switchAuth = () => {
  return useContext(UpdateAuth);
};
