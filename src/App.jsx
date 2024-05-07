import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Profile from './components/Profile';
import ProblemEditor from './components/Editor';
import Leaderboard from './components/Leaderboard';
import Vs from './components/Vs';
import socket from './conn';

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
  const [showVs, setShowVs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const auth = async () => {
    setLoading(true);
    try {
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
            if(data.length === 0) {
              console.log('User not logged in or the session expired');
              setLoggedIn(false);
              return;
            }
            setUsername(data[0].username);
            setUser(data[0]);
            console.log("Data being sent to the server: ", data[0]);
            socket.send(JSON.stringify({type: "login", ...data[0]}));
          }
        }
      } else {
        console.log('User not logged in or the session expired');
        setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    socket.onmessage = (e) => {
      try{
        const data = JSON.parse(e.data);
        console.log(data);
        console.log("setting the page to vs");
        setShowVs(true);
        setTimeout(() => {
          setShowVs(false);
          window.location.reload();
        }, 15000);
      } catch(err) {
        console.log("Dude the data needs to be an object")
        console.log(err);
      }
    }
    auth();
  }, []);

  if (showVs) {
    return <Vs />
  }

  return (
    <div className="App">
      <Header setPage={setPage} loggedIn={loggedIn}/>
      {
        page.includes('username') ? <Profile setPage={setPage} user={user} socket={socket} /> 
          : page === 'leaderboard' ? <Leaderboard user={username} setPage={setPage}/> 
            : page.includes('editor') ? <ProblemEditor setPage={setPage} user={username}/> 
              : <Login socket={socket} status={showLogin} setShowLogin={setShowLogin} setPage={setPage} setLoggedIn={setLoggedIn} setUser={setUser} />
      }
    </div>
  )
}

export default App;

