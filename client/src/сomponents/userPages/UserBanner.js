import React from "react";
// import bannerImg from "../../images/banner.png";
import "../../styles/userPage/userBanner.css";

function UserBanner({ banner }) {
  return (
    <div className="containerMyBanner">
      <img src={banner} alt="Banner" />
    </div>
  );
}
export default UserBanner;
