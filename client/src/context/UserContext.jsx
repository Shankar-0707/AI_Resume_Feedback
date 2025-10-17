import React, {createContext, useState,useEffect, useContext} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null); // {_id, name, email}
    
    // Optional: Auto-login from localStorage token
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);