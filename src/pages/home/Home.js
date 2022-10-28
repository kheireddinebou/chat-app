import React from "react";
import { useState } from "react";
import Container from "../../components/sideBar/container/Container";
import SideBar from "../../components/sideBar/sidebar/SideBar";
import "./home.scss";

const Home = () => {
  const [showSid, setShowSid] = useState(false);

  return (
    <div className="home">
      <div className="home-container">
        <SideBar showSid={showSid}/>
        <Container showSid={showSid} setShowSid={setShowSid} />
      </div>
    </div>
  );
};

export default Home;
