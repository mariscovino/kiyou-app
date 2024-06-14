import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "@/api/client";
import { GlobalContextType } from './GlobalContextType'
import User from "@/api/User";
import Concert from "@/api/Concert";

const GlobalContext = createContext<GlobalContextType | null>(null);
export const useGlobalContext = () => useContext(GlobalContext) as GlobalContextType;

const GlobalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [concert, setConcert] = useState<Concert | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUser = async () => {
    setLoading(true);

    try {
      const email = await AsyncStorage.getItem('email');
      
      if (email != null) {
        const user = await client.post('/users/getUser', { "email": email });
        setUser(user.data);
        setIsLogged(true);
      } else {
        setUser(null);
        setIsLogged(false);
      }
    } catch (error: any) {
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
        setLoading,
        concert,
        setConcert,
        refreshing,
        setRefreshing
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;