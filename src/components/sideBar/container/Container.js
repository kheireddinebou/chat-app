import React from "react";
import Input from "./Input";
import Messages from "./Messages";
import "./container.scss";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { ChatContext } from "../../../Context/ChatContext";

const Container = ({ showSid, setShowSid }) => {
  const { user } = useContext(ChatContext);
  return (
    <>
      <div className="conatiner">
        <div className="top">
          <span>{user?.displayName}</span>
          {/* toggle button for mobile view */}
          <button onClick={() => setShowSid(!showSid)} className="toggle-btn">
            {showSid ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
          {/*  */}
        </div>

        <Messages />
        <Input />
      </div>
    </>
  );
};

export default Container;
