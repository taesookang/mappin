import React, { useState, useRef } from "react";
import "./Login.css";
import { PersonPinCircle, Cancel } from "@material-ui/icons";
import axios from "axios";

export default function Login({
  setShowRegister,
  setShowLogin,
  myStorage,
  setCurrentUser,
}) {
  const [error, setError] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", user);
      const userData = { "email": res.data.email, "username": res.data.username}
      myStorage.setItem("user", JSON.stringify(userData));
      setCurrentUser(res.data.username)
      setShowLogin(false)
      setError(false);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="logo">
        <PersonPinCircle />
        Mappin
      </div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="loginInput">
          <input type="email" placeholder="Email" autoComplete="email" ref={emailRef} />
          <input type="password" placeholder="Password" autoComplete="current-password" ref={passwordRef} />
        </div>
        {error && (
          <span className="failure">Something went wrong ... Try again</span>
        )}
        <button className="loginBtn">Log In</button>
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
