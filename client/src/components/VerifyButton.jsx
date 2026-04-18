import React from 'react';
import "../styles/verify-button.css"
import axios from 'axios';


const VerifyButton = ({ onClick }) => {

  return (
        <button className='verify-btn' onClick={onClick} >
            Verify
        </button>
  );
};

export default VerifyButton;