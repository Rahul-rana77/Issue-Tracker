import { Link } from "react-router-dom"
import "../styles/login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useState, useCallback } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

    const { firstName, lastName, phone, email, password, confirm } = formData;
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/register`, {
        fullName: `${firstName} ${lastName}`,
        phone,
        email,
        password,
      }, {
        withCredentials: true
      });

      console.log(response.data);
      localStorage.setItem("role", "user");
      navigate('/home');
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
      <main className="signup-page">
        <div className="signup-card">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={formData.confirm}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignUp;