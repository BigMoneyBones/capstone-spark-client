import React from "react";
import Nav from "../components/Nav";

const authToken = false;

const handleClick = () => {
  console.log("clicked");
};

const Home = () => {
  return (
    <>
      <Nav />
      <div className="home">
        <h1>Swipe Right®</h1>
        <button className="primary-button" onClick={handleClick}>
          {/* If authToken is true, display 'Signout', otherwise display 'Create Account' */}
          {authToken ? "Signout" : "Create Account"}
        </button>
      </div>
    </>
  );
};

export default Home;
