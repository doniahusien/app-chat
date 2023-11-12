import React from 'react'
import style from './chat.module.css'
import { useChat } from '../../context/ChatContext'
import { BsCameraVideo, BsPersonPlus } from 'react-icons/bs'
import { LuMoreHorizontal } from 'react-icons/lu'
import Messages from '../Messages/Messages';
import Input from '../Input/Input'
const Chat = () => {
    const{data}= useChat()
    return (
        <div className={style.chating}>
            <div className={style.chatNav}>
                <h5>{data.user.displayName}</h5>
                <div className={style.icons}>
                    <BsCameraVideo />
                    <BsPersonPlus />
                    <LuMoreHorizontal />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat