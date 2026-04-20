export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const getOtpHTML = (otp) => {
    return `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Verify Your Email</h2>
            <p>Please use the following OTP to verify your email address:</p>
            <h3>${otp}</h3>
            <p>This OTP will expire in 10 minutes.</p>
        </div>
    `;
};