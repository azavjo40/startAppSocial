import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { UserChangeData } from "../index";
import "../../styles/userPage/userData.css";

function UserData({ titleBtn, items }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="containerMyData">
        <div className="avatar">
          <img src={items._doc.imageSrc} alt="Your img" />
        </div>

        <Button
          variant="outlined"
          color="primary"
          className="btnData"
          onClick={() => setShow(!show)}
        >
          {titleBtn}
        </Button>
        <div className="itemData">
          <p>{items._doc.name}</p>
          <p>{items._doc.country}</p>
        </div>
      </div>
      {show && <UserChangeData items={items} setShow={setShow} show={show} />}
    </>
  );
}

export default UserData;
