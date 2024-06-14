import User from "@/api/User";
import Concert from "@/api/Concert";

export type GlobalContextType = {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    concert: Concert | null;
    setConcert: (concert: Concert | null) => void;
    refreshing: boolean;
    setRefreshing: (refreshing: boolean) => void;
};