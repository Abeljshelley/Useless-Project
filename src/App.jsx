import React, { useState, useEffect } from 'react';
import './App.css'; 
import { GoogleGenerativeAI } from '@google/generative-ai';

function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const API_KEY = import.meta.env.VITE_API_KEY;
    console.log(API_KEY);

    const handleSend = async () => {
        if (!message) return;

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(message);

            setResponse(result.response.text || "No response received");
            setMessage("");
        } catch (error) {
            console.error("Error generating content:", error);
            setResponse("An error occurred while generating the response.");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); 
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="app">
            <h3>RandomGPT!!</h3>
            <div className={`c1 ${response ? 'animate-search-bar' : ''}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    className="inputBox"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key==='Enter' && handleSend()}
                />
                <button className="send-button" onClick={handleSend}>&#10145;</button>
            </div>
            <h1 className={`heading ${response ? 'animate-heading' : ''}`}>
                {response || "What can I help with?"}
            </h1>
        </div>
    );
}

export default App;