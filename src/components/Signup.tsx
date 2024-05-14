import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface SignUpProps {
  onSignUp: (token: string) => void;
}


const SignUp : React.FC<SignUpProps> = ({ onSignUp }) => {
  const [username, setUsername] = useState('')
  const [usermail, setUsermail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_ADDRESS}:${import.meta.env.VITE_BACK_PORT}/auth/signup`, {
        email: usermail,
        name: username,
        password: password,
      })

      const token = response.data.jwt;

      onSignUp(token)
      toast.success("Compte créé !")
      navigate('/dashboard')
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="login-container">
    <Toaster />
    <div className="login-box">
      <h1 className="login-title">S'enregistrer</h1>
      <form className="login-form" onSubmit={handleSignUp}>
        <label className="login-label">
          <input
            className="login-input"
            type="text"
            value={usermail}
            placeholder='email'
            onChange={(e) => setUsermail(e.target.value)}
          />
        </label>
        <label className="login-label">
          <input
            className="login-input"
            type="text"
            value={username}
            placeholder='Nom'
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="login-label">
          <input
            className="login-input"
            type="password"
            value={password}
            placeholder='Mot de passe'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="login-button">
          S'enregistrer
        </button>
      </form>
    </div>
  </div>
  )
}

export default SignUp
