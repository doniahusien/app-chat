import React, { useState } from 'react'
import style from './search.module.css'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useFirebase } from '../../context/Auth';
import { useChat } from '../../context/ChatContext';

const Search = () => {
    const { dispatch } = useChat();


    const { db, auth } = useFirebase()
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", userName)
        )
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (error) {
            console.error(error.message)
        }

    }
    const handleKey = (e) => {
        e.code == "Enter" && handleSearch();

    }
  

    const handleSelect = async () => {
        const CombinedId = auth.uid > user.uid ? auth.uid + user.uid : user.uid + auth.uid;

        try {
            const res = await getDoc(doc(db, "chats", CombinedId));
            if (!res.exists()) {
                await setDoc(doc (db,"chats", CombinedId), { messages: [] });
                await updateDoc(doc(db, "userChats", auth.uid), {
                    [CombinedId+ ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [CombinedId + '.date']: serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [CombinedId+ ".userInfo"]: {
                        uid: auth.uid,
                        displayName: auth.displayName,
                        photoURL:auth.photoURL
                    },
                    [CombinedId + '.date']: serverTimestamp()
                })
              
            }
        } catch (error) {}
        setUser(null);
        setUserName("")
    }
    return (
        <div className={style.srch}>
            <div className={style.search}>
                <input type="text" value={userName} placeholder='find user' onKeyDown={handleKey} onChange={e => setUserName(e.target.value)}/>
            </div>
            {user && <div className={style.chats}>
                <div className={style.chat} onClick={() => handleSelect(user)}>
                    <img src={user.photoURL} className={style.img} alt="" />
                    <div className={style.info}>
                        <span>{user.displayName}</span>
                    </div>
                </div>


            </div>}

        </div>
    )
}

export default Search