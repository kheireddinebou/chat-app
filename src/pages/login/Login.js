import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import addAvatar from "../../img/addAvatar.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="login">
      <div className="form-wrapper">
        <span className="title">Khirou Chat</span>

        <span className="sub-title">Login</span>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>
              something went wrong please try again!
            </p>
          )}
          <button type="submit">Login</button>
        </form>

        <p>
          You don't have an account{" "}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
