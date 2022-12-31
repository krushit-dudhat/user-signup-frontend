import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext, currentUser } from '../App';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { changeAuthToken } = useContext(AuthContext);
  const { changeUser } = useContext(currentUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const validate = () => {
    if (email.length === 0 || !email) {
      setError("Email is required");
      return false;
    } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/)) {
      setError("Email is not valid");
      return false;
    } else if (password.length === 0 || !password) {
      setError("Password is required");
      return false;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();

    let data = {
      email,
      password,
    };
    axios.post("http://localhost:4000/login", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.data.token) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", res.data.data.user._id);
          changeAuthToken(res.data.data.token);
          changeUser(res.data.data.user);
          window.location = `${window.location.origin}/home`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Log in</h1>
      <form action="login" method="post" className="form">
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={(e) => handleInputChange(e)} id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={(e) => handleInputChange(e)} id="password" required />
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Log in</button>
      </form>
      <div>
        <p>forgot password? <a href="/forgot-password">Forgot password</a></p>
      </div>
      <div>
        <p>don't have account? <a href="/singup">Sign up</a></p>
      </div>
    </div>
  )
}
