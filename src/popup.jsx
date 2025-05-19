// Popup.js
import React from 'react';
import { usePopup } from '../context/popUpContext'

const ICONS = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️"
};

const COLORS = {
    success: "#4CAF50",
    error: "#F44336",
    info: "#2196F3",
    warning: "#FF9800"
};

const Popup = () => {
    const { popup, clearPopup } = usePopup();

    if (!popup) return null;

    const { message, type } = popup;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: COLORS[type] || "#333",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minWidth: "280px",
            zIndex: 9999
        }}>
            <span style={{ fontSize: "18px" }}>{ICONS[type] || "💬"}</span>
            <span>{message}</span>
            <button
                onClick={clearPopup}
                style={{
                    marginLeft: "auto",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                ✕
            </button>
        </div>
    );
};

export default Popup;
