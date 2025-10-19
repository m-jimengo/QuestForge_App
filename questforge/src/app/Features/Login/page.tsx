"use client";
import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import styles from './login.module.css';
import { Poppins, Playfair_Display } from 'next/font/google';
import { DiceRoller } from "@/app/Components/DiceRoller/DiceRoller";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={`${styles.loginContainer} ${playfair.className}`}>
            <div className={styles.backgroundOverlay}></div>
            <div className={styles.loginForm}>
                <div>
                    <DiceRoller />
                </div>
                <div className={styles.welcomeBox}>
                    <h1 className={`${styles.welcomeText} ${styles.medievalFont}`}>Welcome back, Adventurer!</h1>
                </div>

                <div className={styles.inputContainer}>
                    <InputText
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className={styles.loginInput}
                    />

                    <InputText
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={styles.loginInput}
                    />
                    <div className={styles.optionsRow}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                className={styles.customCheckbox}
                            />
                            <span className={styles.checkboxText}>Remember me</span>
                        </label>
                        <a href="#" className={styles.forgotPassword}>
                            Forgot Password?
                        </a>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.loginButton} type="button">
                        Log In
                    </button>
                </div>
                <div className={styles.loginWithGoogle}>
                    Login with Google
                </div>
            </div>
        </div>
    );
};

export default Login;