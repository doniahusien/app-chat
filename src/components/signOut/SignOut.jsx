import React from 'react';
import { useFirebase } from '../../context/Auth'; // Import the Firebase context
import { signOut } from 'firebase/auth';
import style from './signout.module.css'
const SignOut = () => {
  const { authInstance } = useFirebase();

  const handleSignOut = async () => {
    try {
      await signOut(authInstance); // Sign the user out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className={style.signout}>Sign Out</button>
  );
};

export default SignOut;
