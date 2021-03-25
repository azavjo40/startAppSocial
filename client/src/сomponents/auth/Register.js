import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../redux/auths/authAcsions";
import { useHistory } from "react-router-dom";
import { Alert } from "../index";
import "../../styles/auth/register.css";
function Register() {
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const changehandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const alert = useSelector((state) => state.general.alert);
  const isloading = useSelector((state) => state.general.isloading);
  const dispach = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    dispach(authRegister(form));
    setForm({ name: "", phone: "", email: "", password: "" });
    setTimeout(() => history.push("/"), 1500);
  };

  return (
    <form className="authForm" onSubmit={(e) => registerHandler(e)}>
      {alert && <Alert text={alert} />}
      <h1>Create An Account</h1>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        required
        value={form.name}
        onChange={(event) => changehandler(event)}
      />
      <input
        type="text"
        name="phone"
        placeholder="Enter Phone"
        required
        value={form.phone}
        onChange={(event) => changehandler(event)}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        required
        value={form.email}
        onChange={(event) => changehandler(event)}
      />
      <input
        type="passeord"
        name="password"
        placeholder="Enter Password"
        required
        value={form.password}
        onChange={(event) => changehandler(event)}
      />
      <button disabled={isloading}>Register</button>
    </form>
  );
}
export default Register;
