import React from "react";
import avatar from "../../images/avatar.jpg";
import Button from "@material-ui/core/Button";
import "../../styles/userPage/userData.css";

function UserData() {
  return (
    <div className="containerMyData">
      <div className="avatar">
        <img src={avatar} alt="Your img" />
      </div>
      <p className="name">Adam Sufiev</p>
      <Button variant="outlined" color="primary" className="btnData">
        Edit Profile
      </Button>
      <div className="itemData">
        <p>I'm student </p>
        <p>Warszawa</p>
      </div>
    </div>
  );
}

export default UserData;
