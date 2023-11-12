import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from "firebase/storage";

const FirebaseContext = createContext(null);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

const authInstance = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)
export const FirebaseProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setAuth(user);
      setIsLoading(false); // Firebase has finished initializing.
    });

    return () => unsubscribe();
  }, []);

  // Wait for Firebase to finish initializing before rendering the children.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FirebaseContext.Provider value={{ auth, authInstance,db,storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};
