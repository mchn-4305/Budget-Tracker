// frontend/features/auth/LogInForm.jsx

import { useState } from "react";
import styles from "./LogIn.module.css";
import { useNavigate, Link } from 'react-router-dom';
const url = "http://localhost:5000";

const LogInForm = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const submitForm = async (event) =>{
        event.preventDefault();
        await login(user);
        setUser({ username: "", password: ""});
    };

    const login = async (userData) => {
        try {
            const res = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            })
            if (!res.ok) {
                throw new Error('Authentication failed');
            }
            
            const data = await res.json();
            localStorage.setItem('authToken', data.token);

            useNavigate("/");
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    }

    return (
        <div className={styles.authform}>
            <h2>Log In</h2>
            <form onSubmit={submitForm}>
                <div className={styles.formgroup}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formgroup}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formgroup}>
                    <button
                        className={`btn ${styles.btn}`}
                        type="submit"
                    >Log In</button>
                </div>
            </form>
            <hr />
            <p className="signUpText">
                Don&apos;t have an account? <Link className="link"to="/signup">Sign up here</Link>
            </p>
        </div>
    )
}