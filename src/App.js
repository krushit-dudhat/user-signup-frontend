import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Forgotpassword from './components/ForgotPassword';
import Loading from './components/Loading';
import UpdateProfile from './components/UpdateProfile';
import ChangePassword from './components/ChangePassword';
import Home from './Home';
import { createContext, useState } from 'react';

export const AuthContext = createContext(null);
export const currentUser = createContext({
  name: null,
  email: null,
});

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const changeAuthToken = (token) => {
    setAuthToken(token);
  }
  const changeUser = (user) => {
    setUser(user);
  }
  return (
    <Router>
      <AuthContext.Provider value={{authToken, changeAuthToken}}>
        <currentUser.Provider value={{user, changeUser}}>
        <div className="App">
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={Forgotpassword} />
            <Route path='/verify-email' component={Loading} />
            <Route path='/update-profile' component={UpdateProfile} />
            <Route path='/home' component={Home} />
            <Route path='/logout' component={Loading} />
            <Route path='/:id/reset-password' component={ChangePassword} />
            <Redirect to="/signup" />
          </Switch>
        </div>
        </currentUser.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
