import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Profile from './components/Profile';
import ProblemEditor from './components/Editor';
import Leaderboard from './components/Leaderboard';
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
  const [page , setPage] = useState('home');
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState({});

  const urlParams = new URLSearchParams(window.location.search);

  const auth = () => {
    const cookie = getCookie('sessionid');
    if (cookie) {
      console.log('User logged in');
      setLoggedIn(true);
      if(!user) {
        // fetch user data
      }
    } else {
      console.log('User not logged in or the session expired');
      setLoggedIn(false);
    }
  };

  const checkPage = () => {
    if (urlParams.has('page')) {
      const page = urlParams.get('page');
      setPage(page);
    } else {
      setPage('home');
    }
  };

  useEffect(() => {
    auth();
    checkPage();
  });

  return (
    <div className="App">
      <Header setPage={setPage}/>
      {
        page.includes('username') ? <Profile setPage={setPage} user={username} /> : page === 'leaderboard' ? <Leaderboard user={username} setPage={setPage}/> 
          : page.includes('editor') ? <ProblemEditor setPage={setPage} user={username}/> : <Login status={showLogin} setShowLogin={setShowLogin}/>
      }
    </div>
  )
}

export default App;

