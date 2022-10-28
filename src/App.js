import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.scss";
import Logout from "./components/sideBar/logout/Logout";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const AuthPath = ({ children }) =>
    currentUser ? children : <Navigate to="/login" />;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <AuthPath>
                <Home />
              </AuthPath>
            }
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={currentUser ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
