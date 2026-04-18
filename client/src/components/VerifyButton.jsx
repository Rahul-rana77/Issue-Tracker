import React from 'react';
import "../styles/verify-button.css"

const VerifyButton = ({ onClick }) => {
  return (
        <button className='verify-btn' onClick={onClick} >
            Verify
        </button>
  );
};

export default VerifyButton;