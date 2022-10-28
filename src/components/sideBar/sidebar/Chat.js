import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../../Context/ChatContext";

const Chat = ({ chat }) => {
  const { displayName, photoURL } = chat[1].userInfo;

  const { dispatch } = useContext(ChatContext);

  const handleSelect = () => {
    dispatch({
      type: "CHANGE_USER",
      payload: chat[1].userInfo,
    });
  };

  return (
    <div className="chat" onClick={handleSelect}>
      <img src={photoURL} alt={displayName} className="lg-avatar" />
      <div className="col">
        <span>{displayName}</span>
        <span className="last-message">{chat[1].lastMessage?.text}</span>
      </div>
    </div>
  );
};

export default Chat;
