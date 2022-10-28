import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="title">Khirou Chat</span>

      <div className="row">
        <img src={currentUser.photoURL} alt="" className="sm-avatar" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
