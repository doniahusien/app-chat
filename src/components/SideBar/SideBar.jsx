import React from 'react'
import NavBar from '../NavBar/NavBar'
import Search from '../Search/Search'
import Chats from '../Chats/Chats'
const SideBar = () => {
    return (
        <div style={{ flex: 1.5, borderRight: "1px solid white" }}>
            <NavBar />
            <Search />
            <Chats />
        </div>
    )
}

export default SideBar