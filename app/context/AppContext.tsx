import { User } from "firebase/auth";
import React from "react";
import { createContext } from "react";

type AppContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => {},
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};