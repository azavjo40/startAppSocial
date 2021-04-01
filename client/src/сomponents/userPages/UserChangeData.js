import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import close from "../../images/close-window.png";
import "../../styles/userPage/userChangeData.css";
function UserChangeData({ name, country, imageSrc, email, setShow, show }) {
  const [form, setForm] = useState({
    name: name,
    email: email,
    country: country,
  });

  const changehandler = (e) => {
    const files = e.target.files;
    const file = files && files[0];
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      file,
      imageSrc,
    });
  };

  const dispach = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    console.log(form);
    // dispach(authRegister(form));
    setTimeout(() => {
      setShow(!show);
      setForm({ name: "", email: "", password: "", country: "" });
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
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          style={{ display: "none" }}
          onChange={changehandler}
        />
        <label htmlFor="icon-button-file" className="imageUser">
          <img src={imageSrc} alt="change " />
        </label>
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
