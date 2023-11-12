import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FirebaseProvider } from './context/Auth';
import { ChatsProvider } from './context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <FirebaseProvider>
                <ChatsProvider>
                        <App />
                </ChatsProvider>
        </FirebaseProvider>
);


