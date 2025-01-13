import { User } from "firebase/auth";
import React from "react";
import { createContext } from "react";
import SleepEntry from "../types/sleepEntry";

type AppContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    sleepEntries: SleepEntry[];
    setSleepEntries: (entries: SleepEntry[]) => void;
};

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: () => {},
    sleepEntries: [],
    setSleepEntries: () => {},
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [sleepEntries, setSleepEntries] = React.useState<SleepEntry[]>([]);

    return (
        <AppContext.Provider value={
            { 
                user, 
                setUser,
                sleepEntries,
                setSleepEntries,
            }}>
            {children}
        </AppContext.Provider>
    );
};