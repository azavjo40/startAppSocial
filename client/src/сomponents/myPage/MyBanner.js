import React from "react";
import bannerImg from "../../images/banner.png";
import "../../styles/myPage/myBanner.css";

function MyBanner() {
  return (
    <div className="containerMyBanner">
      <img src={bannerImg} alt="Avatar" />
    </div>
  );
}
export default MyBanner;
