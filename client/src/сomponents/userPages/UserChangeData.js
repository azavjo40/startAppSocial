import { useState } from "react";
// import { useDispatch } from "react-redux";
import { UserBanner } from "../index";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import close from "../../images/close-window.png";
import "../../styles/userPage/userChangeData.css";
function UserChangeData({ setShow, show, items }) {
  const [form, setForm] = useState({
    name: items._doc.name,
    email: items._doc.email,
    country: items._doc.country,
    _id: items._doc._id,
    imageSrc: items._doc.imageSrc,
  });

  const changehandler = (e) => {
    const files = e.target.files;
    const file = files && files[0];
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      file,
    });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    console.log(form);
    setTimeout(() => {
      setShow(!show);
      setForm({
        name: "",
        email: "",
        password: "",
        country: "",
        _id: "",
        imageSrc: "",
      });
    }, 1000);
  };
  return (
    <div className="modalWind">
      <form className="changeForm" onSubmit={(e) => registerHandler(e)}>
        <div className="btnParagraph">
          <img src={close} alt="close" onClick={() => setShow(!show)} />
          <p>Edit profile</p>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
            Save
          </Button>
        </div>
        <div className="userPhotoChange">
          <input
            accept="image/*"
            id="icon-button-banner"
            type="file"
            style={{ display: "none" }}
            onChange={changehandler}
          />
          <label htmlFor="icon-button-banner">
            <UserBanner banner={items._doc.banner} />
          </label>

          <input
            accept="image/*"
            id="icon-button-avatar"
            type="file"
            style={{ display: "none" }}
            onChange={changehandler}
          />
          <label htmlFor="icon-button-avatar" className="imageUser">
            <img src={items._doc.imageSrc} alt="change " />
          </label>
        </div>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Enter Name"
          required
          value={form.name}
          onChange={changehandler}
        />

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Enter Email "
          required
          value={form.email}
          onChange={changehandler}
        />

        <input
          className="input"
          type="country"
          name="country"
          placeholder="Enter Country"
          required
          value={form.country}
          onChange={changehandler}
        />
      </form>
    </div>
  );
}

export default UserChangeData;
