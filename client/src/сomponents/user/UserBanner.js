import React from "react";
import "../../styles/userPage/userBanner.css";

function UserBanner({ banner }) {
  return (
    <div className="containerMyBanner">
      <img src={banner} alt="Banner" />
    </div>
  );
}
export default UserBanner;
