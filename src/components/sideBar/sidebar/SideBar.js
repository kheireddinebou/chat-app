import React from "react";
import { useState } from "react";
import Logout from "../logout/Logout";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
import "./sidebar.scss";

const SideBar = ({ showSid }) => {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      {showLogout && <Logout setShowLogout={setShowLogout} />}

      <div style={{ left: showSid && 0 }} className="sidebar">
        <Navbar />
       <Search />
        <Chats />
        <button onClick={() => setShowLogout(!showLogout)}>Logut</button>
      </div>
    </>
  );
};

export default SideBar;
