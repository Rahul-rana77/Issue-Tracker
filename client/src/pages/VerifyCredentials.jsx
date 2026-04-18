import React from 'react'

const VerifyCredentials = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Enter OTP</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            style={{
              width: "40px",
              height: "40px",
              fontSize: "20px",
              textAlign: "center",
            }}
          />
        ))}
      </div>

      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Verify OTP
      </button>
    </div> 
  )
}

export default VerifyCredentials