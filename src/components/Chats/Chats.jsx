import React, { useEffect, useState } from 'react'
import './Chats.css'
import { useFirebase } from '../../context/Auth';
import { useChat } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
const Chats = () => {
    const { db, auth } = useFirebase();
    const {dispatch}= useChat()
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", auth.uid), (doc) => {
                setChats(doc.data());
            })
            return () => unsub()
        }
        auth.uid && getChats()
    }, [auth.uid])
    
    const handleSelect = (m) => {
        dispatch({type:"CHANGE_USER",payload: m})
    }
    return (
        <>
            <div className='allChats'>
                {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(chat => (
                    <div className='userChat' key={chat[0]}onClick={()=>handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} className='imgs' alt="" />
                        <div className="info">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text }</p>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default Chats