// LoginForm.js
import React, { useState } from "react";
import SignupForm from "./SignupForm.js";
import { useNavigate } from "react-router-dom";

export function useLoginStatus() {
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") === "true" // Retrieve login status from local storage
  );

  const setLoginStatusAndStore = (status) => {
    setLoginStatus(status);
    localStorage.setItem("loginStatus", status); // Store login status in local storage
  };

  return [loginStatus, setLoginStatusAndStore];
}

function LoginForm() {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginStatus, setLoginStatus] = useLoginStatus();
  const navigate = useNavigate();

  function handleLogin() {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.loggedIn) {
          setLoginStatus(true); // Update login status
          setMessage("Login Successful");
          navigate("/products"); // Navigate after successful login
        } else {
          setLoginStatus(false);
          setMessage("Incorrect username or password");
        }
      })
      .catch((error) => setMessage("Incorrect username or password"));
  }

  return login ? (
    <>
      <div>
        <p id="message" style={{ color: "red" }}>
          {message}
        </p>
      </div>
      <div id="loginForm">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          placeholder="Enter your username"
        ></input>
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="Enter your password"
        ></input>
        <br />
        <button onClick={handleLogin}>Login</button>
        <br />
        <button onClick={() => setLogin(!login)}>Switch to Signup</button>
      </div>
    </>
  ) : (
    <SignupForm />
  );
}

export default LoginForm;