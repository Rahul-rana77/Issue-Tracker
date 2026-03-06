import React from 'react'
import Navbar from '../components/Navbar.jsx'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AdminLogin = () => {
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
    e.preventDefault()

    const email = e.target.email.value
    const code = e.target.password.value

    try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/admin/login`,{
            email,
            code
        },{

        withCredentials: true
    })

    console.log(response.data)

    localStorage.setItem("role", "admin")

    navigate('/admin')
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response:", error.response.data)
      alert(`Admin login failed: ${error.response.data.message || "Invalid credentials"}`)
    } else if (error.request) {
      // Request was made but no response received
      console.error("Error request:", error.request)
      alert("Admin login failed: No response from server")
    } else {
      // Something else happened
      console.error("Error message:", error.message)
      alert("Admin login failed: An unexpected error occurred")
    }
  }
};
  return (
    <>
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
            <h1 className="login-title">Welcome Back Admin</h1>
            <p className="login-subtitle">Sign in to access admin dashboard</p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Admin Code</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your admin code"
                required
              />
            </div>

            <div className="login-buttons">
              <button
                type="submit"
                className="login-btn login-btn-user"
              >
                Login as Admin
              </button>
            </div>
          </form>
          <p className="login-note">
            Don't have an account?
            <Link to="/admin/register" className="create-account-link">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
    </>
  )
}

export default AdminLogin