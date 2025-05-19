// PopupContext.js
import React, { createContext, useState, useContext } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [popup, setPopup] = useState(null);

    const showPopup = ({ message, type = "info", duration = 3000 }) => {
        setPopup({ message, type });

        // Auto-dismiss
        setTimeout(() => {
            setPopup(null);
        }, duration);
    };

    const clearPopup = () => setPopup(null);

    return (
        <PopupContext.Provider value={{ popup, showPopup, clearPopup }}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
