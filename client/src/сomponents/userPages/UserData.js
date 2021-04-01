import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { UserChangeData } from "../index";
import "../../styles/userPage/userData.css";

function UserData({ titleBtn, name, country, imageSrc, email }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="containerMyData">
        <div className="avatar">
          <img src={imageSrc} alt="Your img" />
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
          <p>{name}</p>
          <p>{country}</p>
        </div>
      </div>
      {show && (
        <UserChangeData
          email={email}
          name={name}
          country={country}
          imageSrc={imageSrc}
          setShow={setShow}
          show={show}
        />
      )}
    </>
  );
}

export default UserData;
