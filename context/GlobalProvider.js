import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "@/api/client";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [concert, setConcert] = useState(null)

  const fetchUser = async () => {
    setLoading(true);

    try {
      const email = await AsyncStorage.getItem('email');
      
      if (email != null) {
        const user = await client.post('/users/getUser', { "email": email });
        setUser(user.data);
        setIsLogged(true);
      } else {
        setUser({});
        setIsLogged(false);
      }
    } catch (error) {
      console.log(error.message)
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        concert,
        setConcert
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;