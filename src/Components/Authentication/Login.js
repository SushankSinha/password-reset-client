import React, {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import login from "./Photos/login.png";
import axios from 'axios'


function Login() {

  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      try {

        const response = await axios.post(`http://localhost:8005/login`, {
          method: 'POST',
          headers : {
              Accept: 'applicationjson',
              "Content-Type" : 'applicationjson'
          },
          credentials : 'include'
      }, formData );

        if(response.status === 200){
          window.alert("Login Successful");
        }
  
      } catch (error) {
        
        console.error('Error:', error.message);  
        alert("Invalid Credentials")
      }

    };

  return (
    < form method = 'POST'>
    <Box
      style={{
        display: "block",
        margin: "5% auto",
        maxWidth: "80%",
        height: "fit-content",
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
        <h2 style={{ margin: "20px auto", display : 'block' }}>Login</h2>

        <image
          style={{textAlign: 'center',
          width: '100%',
            height: "300px",
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: 'center'
          }}
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          style={{ margin: "10px" }}
          name = 'email'
          value = {formData.email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          style={{ margin: "10px" }}
          name = 'password'
          value = {formData.password}
          onChange={handleChange}
        />

        <Button
          onClick = {handleSubmit}
          variant="contained"
          style={{ fontWeight: "bold", margin: "10px" }}
        >
          Login
        </Button>

        <h5 style={{ margin: "10px", fontSize : '15px' }}><Link to="/reset_password">Reset Password</Link> | <Link to="/register">Create an Account</Link>
        </h5>
      </Paper>
    </Box>
    </ form>
  );
}

export default Login;
