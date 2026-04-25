import React, { useState } from 'react';
import axios from 'axios';
import '../styles/verify-button.css';

const VerifyButton = ({ emailotp }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/user/verify/email`,
        { emailotp },
        { withCredentials: true }
      );

      setMessage("Verification successful!");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Verification failed.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className='verify-btn' onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyButton;