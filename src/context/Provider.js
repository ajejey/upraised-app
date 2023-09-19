'use client'
import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [userData, setUserData] = useState({})
    const [result, setResult] = useState({})
    return (
        <GlobalContext.Provider value={{
            questions,
            setQuestions,
            userData,
            setUserData,
            result,
            setResult
        }}>
            {children}
        </GlobalContext.Provider>
    );
}