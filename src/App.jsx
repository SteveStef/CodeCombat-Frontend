import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Profile from './components/Profile';
//import Leaderboard from './components/Leaderboard';
//import socket from './conn';

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const cookie = getCookie('sessionid');
    if (cookie) {
      // Make request to the server to check if the session is valid
      console.log('User logged in');
      setLoggedIn(true);
    } else {
      //document.cookie = 'sessionid=test; path=/;';
      console.log('User not logged in or the session expired');
      setLoggedIn(false);
    }

  }, []);

  return (
    <div className="App">
      <Header />
      { loggedIn ? <Profile /> : <Login status={true}/> }
    </div>
  )
}

export default App;
