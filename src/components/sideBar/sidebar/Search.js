import { useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = async () => {
    // check weather the group chat in firebase exists, if no create
    dispatch({
      type: "CHANGE_USER",
      payload: user,
    });

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //  create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      setUser(null);
      setSearchValue("");
    } catch {}
  };

  const handleSearch = async () => {
    setErr(false);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchValue)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleClick = e => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="search">
      <input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyDown={handleClick}
        className="search"
        placeholder="Find a user"
      />
      {err && <p>No user found</p>}
      {user && (
        <div className="chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" className="lg-avatar" />
          <div className="col">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
