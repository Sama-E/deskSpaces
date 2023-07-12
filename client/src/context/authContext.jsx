import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auths/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8800/api/auths/logout");
    setCurrentUser(null);
  }
    
  //Set user information to localStorage - JSON stringify user object
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};