import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { db } from "../../../firebase";
import Chat from "./Chat";

const Chats = () => {
  const [chats, setChats] = useState({});

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), doc => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    if (currentUser.uid) {
      fetchChats();
    }
  }, [currentUser.uid]);

  return (
    <div className="chats">
      {chats !== {} &&  chats ? (
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map(chat => <Chat chat={chat} key={chat[0]} />)
      ) : (
        <span>uploading</span>
      )}
    </div>
  );
};

export default Chats;
