import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import AuthContext from './authContext';
import JoblyApi from './api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem('currUser')));
  const history = useHistory();

  useEffect(function saveCredentialsToLocalStorage() {
    localStorage.setItem('token', token);
    localStorage.setItem('currUser', JSON.stringify(currUser));
  }, [token, currUser])

  async function login(username, password) {
    try {
      const authToken = await JoblyApi.authenticateUser(username, password);
      setToken(authToken);
      const user = await JoblyApi.getUser(username);
      setCurrUser(user);
      history.push ('/'); 
    } catch(err) {
      console.log(err)
    }
  }

  async function signup(newUser) {
    try {
      const authToken = await JoblyApi.registerUser(newUser);
      setToken(authToken);
      const user = await JoblyApi.getUser(newUser.username);
      setCurrUser(user);
      history.push ('/');
    } catch(err) {
      console.log(err)
    }
  }

  function logout() {
    setToken('');
    setCurrUser(null);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{currUser, setCurrUser, token}}>
        <Navbar logout={logout}/>
        <Routes signup={signup} login={login} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
