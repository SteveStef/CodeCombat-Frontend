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
  const [page , setPage] = useState('username');
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [showVs, setShowVs] = useState(false);
  const [user, setUser] = useState({});
  const [setData, setSetData] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = async () => {
    console.log("Checking if user is logged in");
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
            const data = JSON.parse(await response.text());
            //console.log(data);

            if(data.player) { // the problem is that when we load back into the match it doesnt load the props
              console.log('User logged in and is currently in a game');
              setUsername(data.player.username);
              setUser(data.player);
              setSetData(data.game);
              setPage('editor')
              return;
            }

            setUsername(data.username);
            setUser(data);
            socket.send(JSON.stringify({type: "login", ...data}));
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
      try {
        console.log("Here is the data we got back ", e.data);
        const data = JSON.parse(e.data);
        console.log("Here is the data we got back ", data);
        console.log("setting the page to vs");
        setShowVs(true);
        setSetData(data);
        setTimeout(() => {
          setShowVs(false);
          setPage('editor');
        }, 15000);
      } catch(err) {
        console.log("Dude the data needs to be an object")
        console.log(err);
      }
    }
    auth();
  }, []);

  if (showVs) {
    return <Vs data={setData}/>
  }

  return (
    <div className="App">
      <Header setPage={setPage} loggedIn={loggedIn}/>
      {
        page.includes('username') && Object.keys(user).length > 0 ? <Profile setPage={setPage} user={user} socket={socket} /> 
          : page === 'leaderboard' ? <Leaderboard user={username} setPage={setPage}/> 
            : page.includes('editor') ? <ProblemEditor setPage={setPage} user={username} ranked={setData} /> 
              : <Login socket={socket} status={showLogin} setShowLogin={setShowLogin} setPage={setPage} setLoggedIn={setLoggedIn} setUser={setUser} />
      }
    </div>
  )
}

export default App;

