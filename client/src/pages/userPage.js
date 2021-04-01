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
          <UserBanner banner={items._doc.banner} />
          <UserData
            titleBtn="Edit Profile"
            name={items._doc.name}
            imageSrc={items._doc.imageSrc}
            country={items._doc.country}
            email={items._doc.email}
          />
        </div>
      )}
    </div>
  );
}

export default UserPage;
