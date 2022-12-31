import { useState } from "react";
import axios from "axios";

export default function Forgotpassword() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
  }

  const validate = () => {
    if (email.length === 0 || !email) {
      setError("Email is required");
      return false;
    } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/)) {
      setError("Email is not valid");
      return false;
    } else {
      setError(null);
      return true;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();

    const url = "http://localhost:4000/forgot-password";
    axios.put(url, { email })
      .then((res) => {
        console.log(res);
        alert("Email sent for password reset");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <h1>Forgot password</h1>
      {error && <p className="error">{error}</p>}
      <form action="/forgot-password" method="post" className="form">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={(e) => handleInputChange(e)} id="email" required />
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>send Email</button>
      </form>
    </div>
  )
}
