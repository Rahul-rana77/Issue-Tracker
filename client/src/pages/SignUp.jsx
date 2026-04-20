import { Link } from "react-router-dom"
import "../styles/login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useState, useCallback, use } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const { username, phone, email, password, confirm } = formData;
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/register`, {
        username,
        phone,
        email,
        password,
      }, {
        withCredentials: true
      });

      console.log(response.data);
      localStorage.setItem("role", "user");
      navigate('/verify/credentials');
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Registration failed: ${error.response.data.message || "Invalid credentials"}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Registration failed: No response from server");
      } else {
        console.error("Error message:", error.message);
        alert("Registration failed: An unexpected error occurred");
      }
    }
  }, [formData, navigate]);

  return (
    <div className="page">
      <Navbar variant="user" />
      <main className="login-page">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Create an Account</h1>
            <p className="login-subtitle">Sign up to submit your issues</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              <label htmlFor="phone">Phone</label>
              <div className="verify-phone">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <label htmlFor="email">Email</label>
              <div className="verify-email">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group-pair">
                <div className="form-col">
              <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                </div>
                <div className="form-col">
              <label htmlFor="confirm">Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
                  value={formData.confirm}
                  onChange={handleChange}
                  required
                />
                </div>
              </div>
              <div className='login-buttons'>
                  <button type="submit" className='login-btn login-btn-user'>SignUp as User</button>
              </div>
            </div>
          </form>
          <p className='login-note'>Already have an account? 
            <Link to="/" className='create-account-link'> Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default SignUp;