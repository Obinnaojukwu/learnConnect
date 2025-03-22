import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ChatPage.css';

const ChatPage = () => {
    const { userId, friendId } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const websocket = useRef(null);

    useEffect(() => {
        fetchMessages();
        setupWebSocket();
        return () => {
            if (websocket.current) {
                websocket.current.close();
            }
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`/api/messages/${userId}/${friendId}`);
            const data = await response.json();
            if (data.success) {
                setMessages(data.messages);
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const setupWebSocket = () => {
        websocket.current = new WebSocket(`ws://${window.location.host}`);
        websocket.current.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };
    };

    const handleSendMessage = () => {
        const newMessage = {
            senderId: userId,
            receiverId: friendId,
            content: message,
        };
        websocket.current.send(JSON.stringify(newMessage));
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    };

    return (
        <div className="chat-page">
            <header className="chat-header">
                <h1>Chat</h1>
            </header>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.senderId === userId ? 'sent' : 'received'}`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;