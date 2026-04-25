import React, { useState } from 'react'
import OtpInput from '../components/OtpInput.jsx'
import VerifyButton from '../components/VerifyButton.jsx'
import '../styles/verify-credentials.css';

const VerifyCredentials = () => {
  const [emailotp, setEmailOtp] = useState("");

  const handleOtpSubmit = (combinedOtp) => {
    setEmailOtp(combinedOtp);
  };

  return (
    <div className='container'>
      <h2>Verification Sent!</h2>
      <p>Please check your email for the OTP to verify your account.</p>
      <OtpInput onOtpSubmit={handleOtpSubmit} />
      <VerifyButton otp={emailotp} />
    </div>
  )
}

export default VerifyCredentials