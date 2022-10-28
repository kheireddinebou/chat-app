import addImg from "../../../img/img.png";
import CircularProgress from "@mui/material/CircularProgress";
import { MdSend } from "react-icons/md";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";

const Input = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { user, chatId } = useContext(ChatContext);

  useEffect(() => {
    if (file) {
      setLoading(true);
      const storageRef = ref(storage, uuid());
      uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(downloadURL => {
          setImg(downloadURL);
        });

        setLoading(false);
      });
    }
  }, [file]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (file) {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          img,
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      setText("");
      setImg("");
      setFile(null);
    } else {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      setText("");

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [chatId + ".lastMessage"]: {
          text,
        },
        [chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [chatId + ".lastMessage"]: {
          text,
        },
        [chatId + ".date"]: serverTimestamp(),
      });
    }
  };

  return (
    <form className=" input-container">
      <input
        onChange={e => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Type something"
      />
      <input
        onChange={e => setFile(e.target.files[0])}
        style={{ display: "none" }}
        accept="image/*"
        type="file"
        id="img-input"
      />
      <label htmlFor="img-input">
        <img src={addImg} alt="send image" />
      </label>

      {loading ? (
        <CircularProgress sx={{ marginX: "10px", color: "#2F2C53" }} />
      ) : (
        <button
          disabled={loading || (text === "" && !file)}
          onClick={handleSubmit}
        >
          <MdSend className="icon" />
        </button>
      )}
    </form>
  );
};

export default Input;
