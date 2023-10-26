import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import forget from "./Photos/forget.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function ForgetPassword() {
  const [email, setEmail] = useState(true);
  const [otp, setOtp] = useState(false);
  const [password, setPassword] = useState(false);
  const [emailData, setEmailData] = useState("");
  const [otpData, setOtpData] = useState("");
  const [loader, setloader] = useState(false);
  const [passwordData, setPasswordData] = useState("");

  const navigate = useNavigate();

  async function emailSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://password-reset-server-xjyj.onrender.com/user_verification`,
        { email: emailData }
      );

      if (response.status === 200) {
        setEmail(false);
        setOtp(true);
        setloader(false)
        window.alert("Email Id verified, Verify OTP sent to your email!");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Email does not exists!");
    }
  }

  async function otpSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://password-reset-server-xjyj.onrender.com/otp_verification`,
        { email: emailData, otp: otpData }
      );

      if (response.status === 200) {
        setPassword(true);
        setOtp(false);
        window.alert("OTP Verified, Enter your new password!");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Invalid OTP");
    }
  }

  async function passwordSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://password-reset-server-xjyj.onrender.com/reset_password`,
        { email: emailData, password: passwordData }
      );

      if (response.status === 201) {
        window.alert("Password Updated Successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to save password");
    }
  }

  return (
    <form>
      <Box
        style={{
          display: "block",
          margin: "10% auto",
          maxWidth: "80%",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          style={{
            display: "grid",
          }}
          elevation={10}
        >
          <h2 style={{ margin: "20px auto" }}>Reset Password</h2>

          <image
            style={{
              height: "300px",
              backgroundImage: `url(${forget})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            style={{ margin: "10px" }}
            value={emailData}
            disabled={!email}
            onChange={(e) => setEmailData(e.target.value)}
          />

          <Button
            disabled={!email}
            onClick={()=>{emailSubmit(); setloader(true)}}
            variant="contained"
            style={{ height: "40px", margin: "10px", fontWeight: "bold" }}
          >
            Submit
          </Button>
          {loader && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          )}

          <TextField
            id="otp"
            label="OTP"
            variant="outlined"
            style={{ margin: "10px" }}
            value={otpData}
            disabled={!otp}
            onChange={(e) => setOtpData(e.target.value)}
          />

          <Button
            disabled={!otp}
            onClick={otpSubmit}
            variant="contained"
            style={{ height: "40px", margin: "10px", fontWeight: "bold" }}
          >
            Submit
          </Button>

          <TextField
            id="password"
            label="New Password"
            variant="outlined"
            style={{ margin: "10px" }}
            value={passwordData}
            disabled={!password}
            onChange={(e) => setPasswordData(e.target.value)}
          />

          <Button
            disabled={!password}
            onClick={passwordSubmit}
            variant="contained"
            style={{ height: "40px", margin: "10px", fontWeight: "bold" }}
          >
            Submit
          </Button>

          <h4 style={{ margin: "10px", fontSize: "15px" }}>
            Remembered your password? <Link to="/login">Login</Link>{" "}
          </h4>
        </Paper>
      </Box>
    </form>
  );
}

export default ForgetPassword;
