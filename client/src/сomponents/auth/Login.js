import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/auths/authAcsions";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import "../../styles/auth/register.css";
import { Alert } from "../index";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const changehandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const isloading = useSelector((state) => state.general.isloading);
  const alert = useSelector((state) => state.general.alert);
  const dispach = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispach(authLogin(form));
    setForm({ email: "", password: "" });
  };

  return (
    <form className="authForm" onSubmit={(e) => loginHandler(e)}>
      {alert && <Alert text={alert} />}
      <h1>Login</h1>
      <input
        className="input"
        type="email"
        name="email"
        placeholder="Enter Email"
        required
        value={form.email}
        onChange={(event) => changehandler(event)}
      />
      <input
        className="input"
        type="passeord"
        name="password"
        placeholder="Enter Password"
        required
        value={form.password}
        onChange={(event) => changehandler(event)}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isloading}
        color="primary"
        endIcon={<Icon>send</Icon>}
      >
        Login
      </Button>
    </form>
  );
}
export default Login;
