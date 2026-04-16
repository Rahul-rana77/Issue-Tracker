import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import '../styles/login.css' // Ensure login.css is used for styling
import axios from 'axios'

function Login() {
   const navigate = useNavigate()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = useCallback(async (e) => {
      e.preventDefault()

      try {
         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/login`, {
            email,
            password
         }, {
            withCredentials: true
         })

         console.log(response.data)
         localStorage.setItem("role", "user")
         navigate('/home')
      } catch (error) {
         if (error.response) {
            console.error("Error response:", error.response.data)
            alert(`Login failed: ${error.response.data.message || "Invalid credentials"}`)
         } else if (error.request) {
            console.error("Error request:", error.request)
            alert("Login failed: No response from server")
         } else {
            console.error("Error message:", error.message)
            alert("Login failed: An unexpected error occurred")
         }
      }
   }, [email, password, navigate])

   return (
      <div className="page">
        <Navbar variant="user" />
        <main className="login-page">
          <div className="login-card">
            <div className="login-header">
             <svg
              className="login-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
             >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
             </svg>
             <h1 className="login-title">Welcome Back </h1>
             <p className="login-subtitle">Sign in to submit your issues</p>
           </div>

              
               <form className='login-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor="email">Email</label>
                  <input
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
                </div>
                <div className='login-buttons'>
                  <button type="submit" className='login-btn login-btn-user'>Login as User</button>
                </div>
               </form>
               <p className='login-note'>Don't have an account? 
                <Link to="/user/register" className='create-account-link'> Sign Up
                </Link>
               </p>
            </div>
         </main>
      </div>
   )
}

export default Login
