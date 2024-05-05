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
  const [page , setPage] = useState('editor');
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState({});

  console.log('User:', user);

  const auth = async () => {
    const cookie = getCookie('sessionid');
    if (cookie) {
      console.log('User logged in');
      setLoggedIn(true);
      if(!user.username) {
        const requestOptions = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': cookie }};
        const url = 'http://localhost:8081/auth';
        const response = await fetch(url, requestOptions);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUsername(data.username);
          setUser(data);
        }
      }

    } else {
      console.log('User not logged in or the session expired');
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <div className="App">
      <Header setPage={setPage} loggedIn={loggedIn}/>
      {
        page.includes('username') ? <Profile setPage={setPage} user={username} /> 
          : page === 'leaderboard' ? <Leaderboard user={username} setPage={setPage}/> 
            : page.includes('editor') ? <ProblemEditor setPage={setPage} user={username}/> 
              : <Login status={showLogin} setShowLogin={setShowLogin} setPage={setPage} setLoggedIn={setLoggedIn} setUser={setUser} />
      }
    </div>
  )
}

export default App;

