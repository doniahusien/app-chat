import React, { useState } from 'react'
import './input.css'
import {v4 as uuid} from 'uuid'
import { useFirebase } from '../../context/Auth'
import { useChat } from '../../context/ChatContext'
import {TiAttachment,TiImage} from 'react-icons/ti'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
const Input = () => {
  const [text, setText] = useState("")
  const [img,setImg]=useState(null)
  const { data } = useChat();
  const { auth,db,storage } = useFirebase();
  
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: auth.uid,
          date: Timestamp.now(),
          img: downloadURL,
        })
      })

    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: auth.uid,
          date:Timestamp.now(),
        })
      })
      
    }
    await updateDoc(doc(db, "userChats", auth.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]:serverTimestamp()
    })
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
   

    setText("");
    setImg(null);
  }
  return (
    <div className='input'>
      <input type="text" name="type" id="" placeholder='type here'onChange={(e) => setText(e.target.value)}
        value={text} />
      <div className='send'>
        <TiAttachment />
        <input type="file" style={{display:"none"}} name="" id="file"onChange={e=>setImg(e.target.files[0])} />
        <label htmlFor="file">
        <TiImage />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input