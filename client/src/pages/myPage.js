import React from "react";
import { MyBanner, MyData } from "../сomponents";
import "../styles/myPage/myPage.css";
function MyPage() {
  return (
    <div className="containerMyPage">
      <MyBanner />
      <MyData />
    </div>
  );
}

export default MyPage;
