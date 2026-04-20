import React from 'react'
import OtpInput from '../components/OtpInput.jsx'
import VerifyButton from '../components/VerifyButton.jsx'

const VerifyCredentials = () => {
  return (
    <div>
      <h2>Verification Sent!</h2>
      <p>Please check your email for the OTP to verify your account.</p>
      <OtpInput />
      <VerifyButton />
    </div>
  )
}

export default VerifyCredentials