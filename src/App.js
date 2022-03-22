import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Welcome from './components/pages/Welcome';
import Profile from './components/pages/Profile';
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';

function App() {
  // state with the user data when the user is logged in
  const [currentUser, setCurrentUser] = useState(null)
  // useEffect that handles localstorage if the user navigates away from the page/refreshes
  useEffect(() => {
    // check local storage to see if the token is there
    const token = localStorage.getItem('jwt')
    // if the token is found, log the user in. Otherwise, make sure the user is logged out/null
    if (token) {
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])
  // logout handler function that deletes a token from localstorage
  const handleLogout = () => {
    // remove the token from the local storage
    if (localStorage.getItem('jwt')) localStorage.removeItem('jwt')
    // set the user state to be null
    setCurrentUser(null)
  }

  return (
    <Router>
      <Navbar handleLogout={handleLogout} currentUser={currentUser}/>
      <div className="App">
        <Routes>
          <Route
            path='/'
            element={<Welcome />}
          />

          <Route
            path='/login'
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          {/* 
          <Route
            path='/profile'
            element={<Profile />}
          /> */}

          <Route
            path='/profile'
            element={currentUser ? <Profile currentUser={currentUser} /> : <Navigate to='/login'/>} // if logged in, show profile, if not navigate to login
          />

          <Route
            path='/register'
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
