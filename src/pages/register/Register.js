import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import addAvatar from "../../img/addAvatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    let imgUrl =
      "https://firebasestorage.googleapis.com/v0/b/chat-a81d9.appspot.com/o/noProfileImg.png?alt=media&token=a9fbd068-1ccc-4099-8b47-35a973015db9";
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(true);

      if (file) {
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        const uploadTask = await uploadBytesResumable(storageRef, file).then(
          async snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            await getDownloadURL(storageRef).then(async downloadURL => {
              imgUrl = downloadURL;

              await updateProfile(res.user, {
                displayName,
                photoURL: imgUrl,
              });

              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                password,
                photoURL: imgUrl,
              });

              navigate("/login");
            });
          }
        );
      } else {
        await updateProfile(res.user, {
          displayName,
          photoURL: imgUrl,
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          password,
          photoURL: imgUrl,
        });

        navigate("/login");
      }
      await setDoc(doc(db, "userChats", res.user.uid), {});
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="form-wrapper">
        <span className="title">Khirou Chat</span>

        <span className="sub-title">Register</span>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" required />
          <input type="email" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <label htmlFor="file-input">
            <img src={addAvatar} alt="add file" />
            <span>Add an avatar</span>
          </label>
          <input
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            id="file-input"
          />
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>
              something went wrong please try again!
            </p>
          )}
          <button disabled={loading} type="submit">
            {" "}
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p>
          Do you have an account{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
