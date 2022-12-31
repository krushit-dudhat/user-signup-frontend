import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext, currentUser } from '../App';


export default function ChangePassword() {

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState(null);
  const { changeAuthToken } = useContext(AuthContext);
  const { changeUser } = useContext(currentUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "re-password") {
      setRePassword(value);
    }
  }

  const validate = () => {
    if (password.length === 0 || !password) {
      setError("Password is required");
      return false;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    } else if (password !== rePassword) {
      setError("Passwords do not match");
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();

    const url = `http://localhost:4000/user/change-password${window.location.search}`
    axios.put(url, { password, rePassword })
      .then(res => { 
        console.log(res.data);
        // window.location.href = "/login";
        if (res.data.data.token)  {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", res.data.data.user._id);
          changeAuthToken(res.data.data.token);
          changeUser(res.data.data.user);
          console.log(window.location);
          window.location = `${window.location.origin}/home`;
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <h1>Change Password</h1>
      <form action="change password" method="post" className="form">
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={(e) => handleInputChange(e)} id="password" required />
        </div>
        <div>
          <label htmlFor="re-password">Password</label>
          <input type="password" name="re-password" value={rePassword} onChange={(e) => handleInputChange(e) } id="re-password" required />
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)}> save </button>
      </form>
    </div>
  )
}
