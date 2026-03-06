import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom'

const Logout = ({role}) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        try{
            const endpoint = role === "admin" ? `${import.meta.env.VITE_BASE_URL}/api/auth/admin/logout` : `${import.meta.env.VITE_BASE_URL}/api/auth/user/logout`;

            axios.delete(endpoint,{ withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    localStorage.removeItem("role");
                    if (role === "admin") {
                        navigate('/admin-login');
                    } else {
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.error("Logout error:", error);
                });
            }
        catch (error) {
            console.error("Error during logout:", error);
        }

 }
  return (
    <Link className="nav-link nav-link-outline" onClick={handleLogout}>
      Logout
    </Link>
  )
}

export default Logout