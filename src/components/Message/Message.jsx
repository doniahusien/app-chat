import React, { useEffect, useRef } from 'react';
import './message.css';
import img from '../../imgs/7312aa9a-9db3-4eeb-ae3f-e389810f5efa (1).png'
import { useFirebase } from '../../context/Auth';
import { useChat } from '../../context/ChatContext';
const Message = ({ message }) => {
  const { auth } = useFirebase();
  const { data } = useChat();
  const ref = useRef();

  useEffect(() => {
    ref.auth?.scrollIntoView({ behviour: "smooth" })
  }, [message])

  const timestamp = message.date;
  const dateObject = timestamp.toDate();
  const time = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <div ref={ref} className={`message ${message.senderId === auth.uid && `owner`}`}>
      <div className="messageInfo">
        <img src={message.senderId === auth.uid ? auth.photoURL : data.user.photoURL} alt="" className='avat' />
        <div className="content">
          <p className='mess'>{message.text}</p>
          <span>{time}</span>
        </div>
      </div>
      {message.img && <img src={message.img} alt="" className='pic' />}


    </div>
  )
}

export default Message