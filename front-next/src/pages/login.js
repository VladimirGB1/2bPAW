import { useState } from 'react';
import styles from '../styles/Login.module.css';
import { AuthContext } from "../context/authContext.js";
import { useForm } from 'react-hook-form';
import { useContext } from "react";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


    // Aqui você pode adicionar a lógica para login
    const { register, handleSubmit } = useForm();
    const { login, authError} = useContext(AuthContext);

    function handleLogin(data) {
        login(data);
    }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Usuário</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className={styles.button}>Entrar</button>
      </form>
    </div>
  );
};