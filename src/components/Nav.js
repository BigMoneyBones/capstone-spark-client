import React from "react";
// import whiteLogo from "../images/tinder_logo_white.png";
import whiteLogo from "../images/spark_logo_white.png";
import colorLogo from "../images/spark_logo_color.png";

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    // When 'Log In' button is clicked, set to false because we are logging in, not signing up.
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="logo-container">
        {/* if minimal is true, colorLogo. if false, white logo */}
        <img
          // height="65px"
          className="logo"
          src={minimal ? colorLogo : whiteLogo}
          alt=""
        />
      </div>
      {/* if not logged in, AND not minimal, display log in button. */}
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
