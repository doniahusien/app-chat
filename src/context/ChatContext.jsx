import React, { createContext, useContext, useReducer } from 'react';
import { useFirebase } from './Auth';
import { messaging } from '../firebase';
import { useEffect } from 'react';
const ChatContext = createContext(null);
export const useChat = () => {
    return useContext(ChatContext);
};
export const ChatsProvider = ({ children }) => {
    useEffect(() => {
        const requestPermission = async () => {
            try {
                const permission = await Notification.requestPermission();
                console.log('Notification permission:', permission);
            } catch (error) {
                console.error('Error requesting notification permission:', error);
            }
        };

        // Request notification permission on component mount
        requestPermission();
    }, []);
    const { auth } = useFirebase()
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                        auth.uid > action.payload.uid
                            ? auth.uid + action.payload.uid
                            : action.payload.uid + auth.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};