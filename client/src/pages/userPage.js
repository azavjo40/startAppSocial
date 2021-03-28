import React from "react";
import { UserBanner, UserData } from "../сomponents";
import "../styles/myPage/myPage.css";
function UserPage() {
  return (
    <div className="containerMyPage">
      <UserBanner />
      <UserData />
    </div>
  );
}

export default UserPage;
