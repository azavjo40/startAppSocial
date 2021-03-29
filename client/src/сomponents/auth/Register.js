import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../redux/auths/authAcsions";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Alert } from "../index";
import "../../styles/auth/register.css";
function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

  const changehandler = (e) => {
    const filed = e.target.files;
    const file = filed && filed[0];
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      file,
    });
  };

  const alert = useSelector((state) => state.general.alert);
  const isloading = useSelector((state) => state.general.isloading);
  const dispach = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    dispach(authRegister(form));
    setForm({ name: "", email: "", password: "", country: "" });
  };
  return (
    <form className="authForm" onSubmit={(e) => registerHandler(e)}>
      {alert && <Alert text={alert} />}
      <h1>Create An Account</h1>
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
        type="passeord"
        name="password"
        placeholder="Enter Password"
        required
        value={form.password}
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

      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: "none" }}
        onChange={changehandler}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <Button
        type="submit"
        variant="contained"
        disabled={isloading}
        color="primary"
        endIcon={<Icon>send</Icon>}
      >
        Register
      </Button>
    </form>
  );
}
export default Register;
