import { Link } from "react-router-dom"
import "../styles/login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function SignUp() {
  const navigate = useNavigate()
    const handleSubmit = async(e) => {
    e.preventDefault()

    const fullName = e.target.firstName.value + " " + e.target.lastName.value
    const phone = e.target.phone.value
    const email = e.target.email.value
    const password = e.target.password.value
    const confirm = e.target.confirm.value

    if (password !== confirm) {
      alert("Passwords do not match")
      return
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/register`,{
        fullName,
        phone,
        email,
        password,
        confirm
    },{
        withCredentials: true
    })
    
    console.log(response.data)

    localStorage.setItem("role", "user")

    navigate('/home') 

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
      <Navbar variant="user" />
      <div className="login-card">

        <div className="login-header">
          <h2 className="login-title">User Sign Up Form</h2>
          <p className="login-subtitle">
            Create an account to report and track civic issues in your community
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
            <label>Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="+1 555 123 4567"
              className="input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
            id="email"
              type="email"
              placeholder="you@example.com"
              className="input"
            />
          </div>

          <div className="form-group-pair">
            <div className="form-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create password"
                className="input"
              />
            </div>

            <div className="form-col">
              <label htmlFor="confirm">Confirm</label>
              <input
                id="confirm"
                type="password"
                placeholder="Repeat password"
                className="input"
              />
            </div>
          </div>

          <div className="login-buttons">
            <button className="login-btn login-btn-user">
              Create User Account
            </button>
          </div>

          <p className="login-note">
            Already have an account?
            <Link to="/" className="create-account-link">
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default SignUp