import React, { useState, useRef } from "react";
import "./Register.css";
import { PersonPinCircle, Cancel, ArrowForwardIos } from "@material-ui/icons";
import axios from "axios";

export default function Register({ setShowRegister, setShowLogin }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="regContainer">
      <div className="logo">
        <PersonPinCircle />
        Mappin
      </div>
      <form className="regForm" onSubmit={handleSubmit}>
        <div className="regInput">
          <input type="text" placeholder="Username" autoComplete="off" ref={nameRef} />
          <input type="email" placeholder="Email" autoComplete="off" ref={emailRef} />
          <input type="password" placeholder="Password" autoComplete="off" ref={passwordRef} />
        </div>
        {success && (
          <span className="success">Successful 🎉 You can login now</span>
        )}
        {error && (
          <span className="failure">Something went wrong ... Try again</span>
        )}
        {success ? (
          <span
            className="goToLogin"
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          >
            Go to Login <ArrowForwardIos />
          </span>
        ) : (
          <button className="regBtn">Register</button>
        )}
      </form>
      <Cancel className="regCancel" onClick={() => setShowRegister(false)} />
    </div>
  );
}
