import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ New loading state

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
      } catch (error) {
        console.error("Error fetching user info:", error.message);
        setIsLoggedin(false);
        setUserData(null);
      } finally {
        setLoading(false); // ✅ Always set loading false at the end
      }
    };

    fetchUserInfo();
  }, [backendUrl]);

  const value = {
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    backendUrl,
    loading, // ✅ Provide loading globally
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
