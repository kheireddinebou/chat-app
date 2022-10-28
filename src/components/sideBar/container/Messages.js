import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ChatContext } from "../../../Context/ChatContext";
import { db } from "../../../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { user, chatId } = useContext(ChatContext);

  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatId), doc => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [user]);

  return (
    <div className="messages">
      {messages?.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

export default Messages;
