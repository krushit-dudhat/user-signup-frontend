import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";


export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirm-password") {
      setConfirmPassword(value);
    }
  }

  const validate = () => {
    if (name.length === 0 || !name) {
      setError("Name is required");
      return false;
    } else if (name.length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    } else if (email.length === 0 || !email) {
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
    } else if (password !== confirmPassword) {
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
    console.log(name, email, password, confirmPassword);
    let data = {
      name,
      email,
      password,
    }

    axios.post("http://localhost:4000/signup", data)
    .then((res) => {
      console.log(res);
      alert("email sent for verification. please check your email");
    })
    .catch((err) => {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form action="/signup" method="post" className="form">
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={(e) => handleInputChange(e)} id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={(e) => handleInputChange(e)} id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={(e) => handleInputChange(e)} id="password" required />
        </div>
        <div>
          <label htmlFor="confirm-password">Password</label>
          <input type="password" name="confirm-password" value={confirmPassword} onChange={(e) => handleInputChange(e)} id="confirm-password" required />
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Sign Up</button>
      </form>
      <div>
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </div>
  )
}