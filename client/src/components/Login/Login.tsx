import React, { useState, useEffect  } from "react";
import "./Login.scss";
import axios from "axios";
import { environment } from "../../environments/environment";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Preloader from "./Preloader";
import { Checkbox } from "@mui/material";

const apiUrl = environment.apiUrl;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ 
    pin: "",
    citizen_id: "",
    rememberMe: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
    general: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };



  const resetErrorMessages = () => {
    setErrorMessages({ username: "", password: "", general: "" });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    resetErrorMessages();
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, rememberMe: e.target.checked });
  };
  const handleLogin = async () => {
    resetErrorMessages();
    try {
      if (!loginData.citizen_id.trim() || !loginData.pin.trim()) {
        if (!loginData.citizen_id.trim()) {
          
          toast.error("ID Student is required");
        }
        if (!loginData.pin.trim()) {
          toast.error("ID Card is required");
        }
        setErrorMessages({
          username: !loginData.citizen_id.trim() ? "ID Student is required" : "",
          password: !loginData.pin.trim()
            ? "ID Card is required"
            : "",
          general: "Username and password are required",
        });
        setLoading(false);
        return;
      }
      

      const response = await axios.post(`${apiUrl}/auth/login`, loginData);

      if (response.data && response.data.token) {
        setLoading(true);
        const { token, accountrole } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", accountrole);


        /////////// remember
        if (loginData.rememberMe && loginData.pin.trim() && loginData.citizen_id.trim()) {
          localStorage.setItem("username", loginData.pin);
          localStorage.setItem("password", loginData.citizen_id);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        toast.success("Login Success");


        /////////////////// check role
        setTimeout(() => {
          setLoading(false);
          if (accountrole === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }, 1000);
      } else {
        setLoading(false);
        setErrorMessages((prevState) => ({
          ...prevState,
          general: "Invalid username or password",
        }));
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid username or password");
      setLoading(false);
      setErrorMessages({
        username: "",
        password: "",
        general: "Authentication failed. Please try again.",
      });
    }
  };

  // const handleLogin = async () => {
  //   resetErrorMessages();
  //   setLoading(true); // Simulate loading

  //   // Simulate successful login
  //   if (loginData.id.trim() && loginData.citizen_id.trim()) {
  //     // You can add additional conditions if needed
  //     toast.success("Login Success");

  //     // Simulate delay before redirecting
  //     setTimeout(() => {
  //       setLoading(false);
  //       navigate("/user"); // Redirect to user page
  //     }, 100000);
  //   } else {
  //     // Simulate login failure
  //     setLoading(false);

  //   }
  // };
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setLoginData((prevData) => ({
        ...prevData,
        pin: storedUsername,
        citizen_id: storedPassword,
        rememberMe: true,
      }));
    }
  }, []);

  return (
    <React.Fragment>
    {!loading &&  (
      <div className="login-form">
      <div className="login-logo text-center text-3xl font-semibold mb-6 text-gray-800 text-white">
        <img src="../../../dist/assets/img/rmutp-logo.png" alt="" />
          <h1>
          Room Reservation System at RMUTP
          </h1>
      </div>
      <div className="login-form-container">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">
          Login
        </h1>
        <div className={`input-login ${errorMessages.username ? "error" : ""}`}>
          <label htmlFor="citizen_id" className="text-sm text-gray-600">
            ID Student
          </label>
          <input
            type="text"
            name="citizen_id"
            value={loginData.citizen_id}
            onChange={handleInputChange}
            placeholder="ID Student"
            className={`input-field ${errorMessages.username ? "error" : ""}`}
          />
          {errorMessages.username && (
            <p className="error-message">{errorMessages.username}</p>
          )}
        </div>
        <div className={`input-login login-password ${errorMessages.username ? "error" : ""}`}>
          <label htmlFor="pin" className="text-sm text-gray-600">
            ID Card
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="pin"
            value={loginData.pin}
            onChange={handleInputChange}
            placeholder="ID Card"
            className={`input-field ${errorMessages.password ? "error" : ""}`}
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </div>
          {errorMessages.password && (
            <p className="error-message">{errorMessages.password}</p>
          )}
          {errorMessages.general && (
          <p className="error-message mt-2">{errorMessages.general}</p>
        )}
        </div>
        <div className="remember-me">
          <Checkbox
            id="rememberMe"
            checked={loginData.rememberMe}
            onChange={handleCheckboxChange}
            defaultChecked
            style={{color: "#D0A2F7"}}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <button  onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
      </div>
      )}
    {loading && <Preloader />}
    </React.Fragment>
  );
};

export default Login;
