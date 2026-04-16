import React, { useState } from 'react';
import "../styles/login.css";

const OtpSubmission = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add OTP submission logic here
    console.log("Submitted OTP:", otp);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Enter OTP</h2>
        <p>Please enter the 6-digit OTP sent to your email or phone.</p>
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          maxLength="6"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OtpSubmission;