import React, { useEffect } from "react";
import { UserBanner, UserData } from "../сomponents";
import "../styles/userPage/userPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserPage } from "../redux/userPages/userAcsions";
function UserPage() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  useEffect(() => dispatch(getUserPage(userId)), [dispatch, userId]);
  const items = useSelector((state) => state.userPages.user);
  // console.log(items);
  // console.log(userId);
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
