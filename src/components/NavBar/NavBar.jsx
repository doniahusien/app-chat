import React from 'react'
import img from '../../imgs/7312aa9a-9db3-4eeb-ae3f-e389810f5efa (1).png'
import style from './NavBar.module.css';
import SignOut from '../signOut/SignOut';
import { useFirebase } from '../../context/Auth';
const NavBar = () => {
    const {auth}= useFirebase()
    return (
        <div className={style.nav}>
            <div className={style.profile}>
                <img src={auth.photoURL} className={style.ava} alt="" />
                <h5>{auth.displayName }</h5>
            </div>

            <div className={style.out}>
                <SignOut />
            </div>
        </div>
    )
}

export default NavBar