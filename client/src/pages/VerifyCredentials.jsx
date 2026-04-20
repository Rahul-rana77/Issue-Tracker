import React, { useState } from 'react';

const VerifyCredentials = () => {
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');

  const handleVerify = () => {
    console.log('Email OTP:', emailOtp);
    console.log('Phone OTP:', phoneOtp);
    // Add verification logic here
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Verify Your Credentials</h2>

      <div>
        <label>Email OTP:</label>
        <input
          type="text"
          value={emailOtp}
          onChange={(e) => setEmailOtp(e.target.value)}
          placeholder="Enter email OTP"
        />
      </div>

      <div>
        <label>Phone OTP:</label>
        <input
          type="text"
          value={phoneOtp}
          onChange={(e) => setPhoneOtp(e.target.value)}
          placeholder="Enter phone OTP"
        />
      </div>

      <button onClick={handleVerify} style={{ marginTop: '20px' }}>
        Verify
      </button>
    </div>
  );
};

export default VerifyCredentials;