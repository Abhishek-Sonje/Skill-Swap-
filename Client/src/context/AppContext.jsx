import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { config } from "../config";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ New loading state

  // Use centralized configuration
  const backendUrl = config.API_URL;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/myInfo`, {
          withCredentials: true,
        });

        if (data.success) {
          setIsLoggedin(true);
          setUserData(data.user);
        } else {
          setIsLoggedin(false);
          setUserData(null);
        }
      } catch (e) {
        // Only reset auth state if we don't already have user data
        console.log(e);
        if (!userData) {
          setIsLoggedin(false);
          setUserData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [backendUrl, userData]);

  const setAuthState = (isLoggedIn, user) => {
    setIsLoggedin(isLoggedIn);
    setUserData(user);
  };

  const value = {
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    backendUrl,
    loading, // ✅ Provide loading globally
    setAuthState, // Add this function to the context
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
