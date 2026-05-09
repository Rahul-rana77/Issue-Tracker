import React, { useState } from 'react';
import '../styles/otpinput.css';

const OtpInput = ({ onOtpSubmit }) => {

  const handleChange = (e) => {
    const value = e.target.value;
    onOtpSubmit(value);
  };

  return (
    <>
      <div className="otp-input-container">
        <input 
          type="text" 
          className='otpInput' 
          placeholder='Enter OTP'
          onChange={handleChange} 
        />
      </div>
    </>
  );
};

export default OtpInput;