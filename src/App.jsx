import './App.css';
import { useEffect } from 'react';
import socket from './conn';

import Header from './components/Header';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';

function App() {

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <Header />
      <Profile />
      <Leaderboard />
    </div>
  )
}

export default App;
