import ForgetPassword from "./Components/Authentication/ForgetPassword";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset_password" element={<ForgetPassword />} />
        <Route path="/" element={<Navigate replace to="/register" />} />
      </Routes>
    </div>
  );
}

export default App;
