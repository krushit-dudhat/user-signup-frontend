import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { currentUser, AuthContext } from '../App';

export default function UpdateProfile() {
  const { user } = useContext(currentUser);
  const { authToken } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(user?.name || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [gender, setGender] = useState("male");

  const handleFileChange = (event) => {
    // const file = event.target.files[0];
    setImage(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "dob") {
      setDob(value);
    } else if (name === "gender") {
      setGender(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile', image);
    name && formData.append('name', name);
    dob && formData.append('dob', dob);
    gender && formData.append('gender', gender);

    const url = `http://localhost:4000/user/${localStorage.getItem("user")._id}`
    console.log(authToken);
    axios.defaults.headers.common["Authorization"] = `${authToken || localStorage.getItem("token")}`;
    axios.put(url, formData)
      .then((res) => {
        console.log(res.data);
        window.location = `${window.location.origin}/home`
        console.log(window.location);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  }

  return (
    <div>
      <h1>Update Profile</h1>
      <form>
        <div>
          {image && <img src={image} alt="Selected" width="200" height="200" />}
        </div>
        <div>
          <label htmlFor="image-picker">Select profile photo:</label>
          <input type="file" id="image-picker" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={(e) => handleInputChange(e)} id="name" required />
        </div>
        <div>
          <label htmlFor="dob">DOB:</label>
          <input type="date" id="dob" name="dob" value={dob} onChange={(e) => handleInputChange(e)} />
        </div>
        <div>
          <label htmlFor="gender">gender: </label>
          <input type="radio" name="gender" value="male" checked={"male" === gender} onChange={(e) => handleInputChange(e)} id="male-gender" /> Male
          <input type="radio" name="gender" value="female" checked={"female" === gender} onChange={(e) => handleInputChange(e)} id="female-gender" /> Female
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)}>Save</button>
      </form>
    </div>
  );
}
