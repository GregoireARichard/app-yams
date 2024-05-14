import React, { useState } from "react"
import axios from "axios"
import "../style/login.css"
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [usermail, setUsermail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();
    
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_ADDRESS}:${import.meta.env.VITE_BACK_PORT}/auth/signin`, {
        email: usermail,
        password: password,
      })

      const token = response.data.jwt

      onLogin(token)
      toast.success("Connecté !")
      navigate('/dashboard')
      
    } catch (error) {
      console.log(error)
      toast.error("Mot de passe ou adresse email incorrect")
    }
  }

  return (
    <div className="login-container">
      <Toaster />
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label">
            <input
              className="login-input"
              type="text"
              value={usermail}
              placeholder="email"
              onChange={(e) => setUsermail(e.target.value)}
            />
          </label>
          <label className="login-label">
            <input
              className="login-input"
              type="password"
              value={password}
              placeholder="mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="login-button">
            Se connecter
          </button>
          <div className="signup-link">
            Vous n'avez pas de compte ? <a href="/signup">S'enregistrer</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
