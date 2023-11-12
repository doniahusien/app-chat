import React, { useState, useEffect } from 'react';
import Message from '../Message/Message';
import './messages.css';
import { useChat } from '../../context/ChatContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { useFirebase } from '../../context/Auth';
const Messages = () => {
  const { auth } = useFirebase();
  const { data } = useChat();
  const { db } = useFirebase();
  const [messages, setMessages] = useState([]);
  const [shownMessages, setShownMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      if (doc.exists()) {
        const newMessages = doc.data().messages;
        setMessages(newMessages);
        const latestMessage = newMessages[newMessages.length - 1];
        if (
          latestMessage &&
          latestMessage.senderId !== auth.uid &&
          !shownMessages.includes(latestMessage.messageId)
        ) {
          if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                const notification = new Notification('New Message', {
                  body: latestMessage.text,
                });
                notification.onclick = () => {
                  window.location.href = '/';
                };
                setTimeout(() => {
                  notification.close();
                }, 5000);
              }
            });
          }
          setShownMessages((prevMessages) => [
            ...prevMessages,
            latestMessage.messageId,
          ]);
        }
      }
    });

    return () => unSub();
  }, [db, data.chatId, auth.uid, shownMessages]);

  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
