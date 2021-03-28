import React from "react";
import bannerImg from "../../images/banner.png";
import "../../styles/myPage/myBanner.css";

function UserBanner() {
  return (
    <div className="containerMyBanner">
      <img src={bannerImg} alt="Avatar" />
    </div>
  );
}
export default UserBanner;
