import "./logout.scss";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

const Logout = ({ setShowLogout }) => {

  const handleLogout = () => signOut(auth);
  

  return (
    <div className="logout">
      <div className="overlay"></div>
      <div className="container">
        <span>Are you sure you want to logout!</span>

        <div className="row">
          <button onClick={() => setShowLogout(false)} className="canel-btn">
            Canel
          </button>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
