import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../components/login/login.module.css';
import { useFirebase } from '../context/Auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



function SignUp() {
    const { authInstance,db,storage } = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [file, setFile] = useState('');

    const navigate= useNavigate()

    const Sign = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!displayName || displayName === '') {
            setError('Please enter your name');
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(authInstance, email, password)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            await uploadTask;
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});

            setEmail('');
            setPassword('');
            setName('');
            setConfirmPassword('');
            setFile('');
            navigate('/')
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Email address is already in use. Please log in.');
            } else {
                setError(error.message);
            }
        }
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.card}>
                    <h2>Sign Up</h2>
                    <div className={style.form}
                    >    <input
                            type="text"
                            placeholder="Name"
                            value={displayName}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input type="file" name="file" id="ava" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                        <label htmlFor="ava">
                            Upload image</label>
                        {error && <p>{error}</p>}
                        <button onClick={Sign}>SignUP</button>
                    </div>
                    <p>You have already account? <Link to='/login'className={style.link}>Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default SignUp;
