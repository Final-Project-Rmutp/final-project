import React, { useState, useEffect  } from "react";
import "./Login.scss";
import axios from "axios";
import { environment } from "../../environments/environment";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Preloader from "./Preloader";

const apiUrl = environment.apiUrl;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ 
    id: "", 
    citizen_id: "",
    password: "",
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
    setLoading(true);
    try {
      if (!loginData.id.trim() || !loginData.citizen_id.trim()) {
        if (!loginData.id.trim()) {
          toast.error("ID Card is required");
        }
        if (!loginData.citizen_id.trim()) {
          toast.error("ID Student is required");
        }
        setErrorMessages({
          username: !loginData.id.trim() ? "ID Card is required" : "",
          password: !loginData.citizen_id.trim()
            ? "ID Student is required"
            : "",
          general: "Username and password are required",
        });
        return;
      }

      const response = await axios.post(`${apiUrl}/auth/login`, loginData);

      if (response.status === 200 && response.data.token) {
        const { token, accountrole } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", accountrole);


        /////////// remember
        if (loginData.rememberMe && loginData.id.trim() && loginData.citizen_id.trim()) {
          localStorage.setItem("username", loginData.id);
          localStorage.setItem("password", loginData.citizen_id);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        toast.success("Login Success");


        /////////////////// check role
        setTimeout(() => {
          setLoading(false); // Hide preloader
          if (accountrole === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }, 1000);
      } else {
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


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setLoginData((prevData) => ({
        ...prevData,
        id: storedUsername,
        citizen_id: storedPassword,
        rememberMe: true,
      }));
    }
  }, []);

  return (
    <React.Fragment>
    {!loading && (
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
            ID Card
          </label>
          <input
            type="text"
            name="citizen_id"
            value={loginData.citizen_id}
            onChange={handleInputChange}
            placeholder="ID Card"
            className={`input-field ${errorMessages.username ? "error" : ""}`}
          />
          {errorMessages.username && (
            <p className="error-message">{errorMessages.username}</p>
          )}
        </div>
        <div className={`input-login login-password ${errorMessages.username ? "error" : ""}`}>
          <label htmlFor="id" className="text-sm text-gray-600">
            ID Student
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="id"
            value={loginData.id}
            onChange={handleInputChange}
            placeholder="ID Student"
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
          <input
            type="checkbox"
            id="rememberMe"
            checked={loginData.rememberMe}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
      </div>
      )}
    {loading && <Preloader />} {/* Show preloader if loading */}
    </React.Fragment>
  );
};

export default Login;
