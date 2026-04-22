import React, { createContext, useContext, useState, useEffect, useCallback, Children } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
    isLoggedIn: boolean;
    loading: boolean;
    user: {username: string } | null;
    error: string | null;
};

type AuthCotextType = AuthState & {
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>
};

// ---Mock credentials -- swap for a real API call later------

const MOCK_USERS = [
    { username: "admin", password: "admin123"},
    { username: "luke", password: "password1"}
];

const USER_KEY = "@auth_user";

//--Initial state----
const initialState: AuthState = {
    isLoggedIn: false,
    loading: true,
    user: null,
    error: null
};

const AuthContext = createContext<AuthCotextType>({
    ...initialState,
    login: async () => {},
    logout: async () => {}    
});

//-- Provider ---
export const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [state, setState] = useState<AuthState>(initialState);

    const setParialState = (update: Partial<AuthState>) => 
        setState(prev => ({...prev, ...update}));

    //--Restore session on app launch ---
    useEffect(() => {
        const restoreSession = async () => {
            try{
                const stored = await AsyncStorage.getItem(USER_KEY);
                if(stored){
                    setParialState({
                        isLoggedIn: true,
                        user: JSON.parse(stored),
                        loading: false
                    });
                } else {
                    setParialState({loading: false})
                }
            } catch(e){
                console.error("Failed to restore session: ", e);
                setParialState({ loading: false});
            }
        };
        restoreSession();
    }, []);

    //-- Login --
    const login = useCallback(async (username: string, password: string) => {
        setParialState({ loading: true, error: null});

        // Simulate a network delay
        await new Promise(res => setTimeout(res, 800));

        const match = MOCK_USERS.find(
            u => u.username === username.trim() && u.password === password
        );

        if(!match)
        {
            setParialState({
                loading: false,
                error: "Invalid username and password"
            });
            return;
        }

        const user = {username: match.username};

        try{
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            setParialState({ isLoggedIn: true, user, loading: false, error: null});
        } catch(e){
            console.error("Failed to persist session: ", e);
            setParialState({loading: false, error: "Something went wrong. "});
        }
    }, []);

    //--Logout --
    const logout = useCallback(async () => {
        try{
            await AsyncStorage.removeItem(USER_KEY);
        } catch (e) {
            console.error("Failed to clear session:", e);
        } finally {
            setParialState({ isLoggedIn: false, user: null, error: null});
        }
    }, []);

    return (
        <AuthContext.Provider value={{...state, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);