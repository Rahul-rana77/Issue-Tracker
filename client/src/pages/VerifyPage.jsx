import React from 'react';
import VerifyButton from '../components/VerifyButton';

const VerifyPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Phone Number" 
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
        <VerifyButton onClick={() => alert('Verify clicked!')} />
      </div>
    </div>
  );
};

export default VerifyPage;