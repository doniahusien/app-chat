
import React, { useState } from 'react';
import { useFirebase } from '../context/Auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import style from '../components/login/login.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const { authInstance } = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(authInstance, email, password);
            navigate('/');
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.card}>
                    <h2>Log in</h2>
                    <div className={style.form}>
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
                        {error && <p>{error}</p>}
                        <button onClick={handleLogin}>Login</button>
                    </div>
                    <p>Don't have account ?<Link to='/signup' className={style.link}>Sign Up</Link></p>
                </div>
            </div>

        </>
    );
};

export default Login;
