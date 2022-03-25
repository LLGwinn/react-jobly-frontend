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
  try {
    JSON.parse(localStorage.getItem('currUser'))
  } catch (err) {
    console.log(err);
  }

  const history = useHistory();

  useEffect(function saveCredentialsToLocalStorage() {
    localStorage.setItem('token', token);
    localStorage.setItem('currUser', JSON.stringify(currUser));
  }, [token, currUser])

  async function login(username, password) {
    try {
      const authToken = await JoblyApi.authenticateUser(username, password);
      const user = await JoblyApi.getUser(username);
      if (authToken && user) {
        setToken(authToken);
        setCurrUser(user);
        history.push ('/'); 
      } else throw new Error()
    } catch(err) {
      alert ('Invalid username/password.')
    }
  }

  async function signup(newUser) {
    const authToken = await JoblyApi.registerUser(newUser).catch((err) => {
      console.log(err);
    });
    setToken(authToken);
    const user = await JoblyApi.getUser(newUser.username);
    setCurrUser(user);
    history.push ('/');

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
