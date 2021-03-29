import React from "react";
import { UserBanner, UserData } from "../сomponents";
import "../styles/userPage/userPage.css";
import { useSelector } from "react-redux";
function UserPage() {
  const items = useSelector((state) => state.userPages.user);
  return (
    <div className="containerMyPage">
      {items && (
        <div className="itemsPage">
          <UserBanner />
          <UserData
            titleBtn="Edit Profile"
            name={items.name}
            imageSrc={items.imageSrc}
            country={items.country}
          />
        </div>
      )}
    </div>
  );
}

export default UserPage;
