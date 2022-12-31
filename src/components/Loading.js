import { useState, useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { AuthContext, currentUser } from '../App';

export default function Loading() {

  const [loading, setLoading] = useState(true);
  const { authToken, changeAuthToken } = useContext(AuthContext);
  const { changeUser } = useContext(currentUser);

  useEffect(() => {
    console.log(window.location);
    const url = window.location 
    if (window.location.pathname === "/logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      axios.defaults.headers.common["Authorization"] = `${authToken || localStorage.getItem("token")}`;

      axios.get(`http://localhost:4000/logout`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
      setLoading(false);
      window.location = `${window.location.origin}/login`;
    } else {
    axios.get(`http://localhost:4000${url.pathname}${url.search}`)
      .then(res => {
        changeAuthToken(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", res.data.data.user._id);
        changeUser(res.data.data.user);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, []);


  return (
    <div>
      {loading ? <h1> Loading...</h1> : <Redirect to='/update-profile'/>}
    </div>
  )
}
