import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';
//import socket from './conn';

import Header from './components/Header';
import Profile from './components/Profile';
//import Leaderboard from './components/Leaderboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <Header />
      {
        loggedIn ? <Profile /> : <Login status={true}/>
      }
      <Profile />
    </div>
  )
}

export default App;
