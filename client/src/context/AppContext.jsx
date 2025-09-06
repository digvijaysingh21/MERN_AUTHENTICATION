import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      // toast.error(data.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);
  // const getUserData = async () => {
  //   try {
  //     const { data } = await axios.get(backendUrl + "/api/user/data", {
  //       withCredentials: true, // make sure cookies (token) are sent
  //     });

  //     console.log("📌 getUserData response:", data); // 👈 log backend response

  //     if (data.success) {
  //       console.log("📌 userData being set:", data.userData); // 👈 log actual userData
  //       setUserData(data.userData);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "❌ getUserData error:",
  //       error.response?.data || error.message
  //     );
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
