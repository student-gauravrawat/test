import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// creating custom hook so that we can access context easily by which we do need to repeat this useContext line 
export const useAuth = () => useContext(AuthContext);

// wrapper component that wrap full application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login function that ckecks user is login or not
  const login = (username, password) => {

    if (username === "admin" && password === "admin123") {
      setUser({ role: "admin" });
      return true;
    }

    if (username === "staff" && password === "staff123") {
      setUser({ role: "staff" });
      return true;
    }
    return false;
  };

  // it is logout feature that set null at the place of  user 
  const logout = () => setUser(null);

  return (
    //here we are sharing data such as userRole, login, logout function  
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};