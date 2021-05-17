import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import "./Header.css"

export default function Header({ currentUser, setCurrentUser }) {
  const myStorage = window.localStorage;

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogOut = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    const checkUser = () => {
      const userData = myStorage.getItem("user");
      if (userData) {
        setCurrentUser(JSON.parse(userData).username);
      } else {
        setCurrentUser(null);
      }
    };
    checkUser();
  }, [myStorage, setCurrentUser]);
  return (
    <>
      {currentUser ? (
        <button className="btn logout" onClick={handleLogOut}>
          Log Out
        </button>
      ) : (
        <div className="btns">
          <button
            className="btn login"
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
            }}
          >
            Log In
          </button>
          <button
            className="btn register"
            onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
          >
            Register
          </button>
        </div>
      )}
      {showRegister && (
        <Register
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
        />
      )}
      {showLogin && (
        <Login
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
          myStorage={myStorage}
          setCurrentUser={setCurrentUser}
        />
      )}
    </>
  );
}
