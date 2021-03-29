import React from "react";
import Button from "@material-ui/core/Button";
import "../../styles/userPage/userData.css";

function UserData({ titleBtn, name, country, imageSrc }) {
  return (
    <div className="containerMyData">
      <div className="avatar">
        <img src={imageSrc} alt="Your img" />
      </div>

      <Button variant="outlined" color="primary" className="btnData">
        {titleBtn}
      </Button>
      <div className="itemData">
        <p>{name}</p>
        <p>{country}</p>
      </div>
    </div>
  );
}

export default UserData;
