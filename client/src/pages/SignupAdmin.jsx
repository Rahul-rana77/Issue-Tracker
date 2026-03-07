import { Link } from "react-router-dom"
import "../styles/login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from "../components/Navbar"

function SignupAdmin() {
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
    e.preventDefault()

    const fullName = e.target.firstName.value + " " + e.target.lastName.value
    const phone = e.target.phone.value
    const email = e.target.email.value
    const code = e.target.code.value

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/admin/register`,{
        fullName,
        phone,
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
        alert(`Login failed: ${error.response.data.message || "Invalid credentials"}`)
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request)
        alert("Login failed: No response from server")
      } else {
        // Something else happened
        console.error("Error message:", error.message)
        alert("Login failed: An unexpected error occurred")
      }
    }
  };
  return (
    <div className="login-page">
      <Navbar variant="admin" />
      <div className="login-card">

        <div className="login-header">
          <h2 className="login-title">Admin Sign Up Page</h2>
          <p className="login-subtitle">
            Become an admin to manage and update the status of civic issues in your community
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="form-group-pair">
            <div className="form-col">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                className="input"
              />
            </div>

            <div className="form-col">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Smith"
                className="input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="+1 555 123 4567"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">Admin Code</label>
            <input
              type="password"
              id="code"
              placeholder="Enter your admin code"
              className="input"
            />
          </div>

          <div className="login-buttons">
            <button className="login-btn login-btn-user">
              Create Admin Account
            </button>
          </div>

          <p className="login-note">
            Already have an account?
            <Link to="/admin-login" className="create-account-link">
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default SignupAdmin