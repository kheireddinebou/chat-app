import React, { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";
import { format } from "timeago.js";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { user } = useContext(ChatContext);

  const isOwnerMessage = () =>
    message.senderId === currentUser.uid ? true : false;

  const ref = useRef();

  useEffect(() => {
    isOwnerMessage();

    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`message ${isOwnerMessage() && "owner"}`}>
      <div className="info">
        <img
          src={isOwnerMessage() ? currentUser.photoURL : user.photoURL}
          alt=""
          className="sm-avatar"
        />
        <span>{format(message.date.seconds * 1000)}</span>
      </div>

      <div className="content">
        {message.text !== "" && <span>{message.text}</span>}
        <img src={message?.img} alt="" />
      </div>
    </div>
  );
};

export default Message;
