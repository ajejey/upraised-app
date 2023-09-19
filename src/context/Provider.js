'use client'
import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const [questions, setQuestions] = useState({});
    return (
        <GlobalContext.Provider value={{
            questions,
            setQuestions
        }}>
            {children}
        </GlobalContext.Provider>
    );
}