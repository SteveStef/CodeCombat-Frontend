import profilePic from '../assets/robo0.png';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import Chart from './Chart';

const url = "http://localhost:8081";
const Profile = (props) => {

  // create the connection through ws
  const playRanked = async () => {
    try {
      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: props.user.username }),
        method: "POST",
      };

      const response = await fetch(`${url}/ranked`, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // start listening on the socket

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  const days = eachDayOfInterval({ start, end });
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800" >
      <div className="w-full max-w-2md mx-auto">
        <div className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <div className="mb-4 flex justify-center">
              <img className="w-48 h-48 object-cover mx-auto rounded-full md:w-48 md:h-48 lg:w-64 lg:h-64" src={profilePic} alt="Profile" />
              <div className="flex flex-col">
              <h1 className="text-center text-xl font-bold text-gray-900 dark:text-white">
                  {props.user.username}
                <span className="font-bold" style={{color: "lightblue"}}> ({props.user.level})</span> 
                </h1>
                <div className="mt-5">
                  <Chart user={props.user}/>
                </div>
              </div>
            </div>
            <div className="mb-4 flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow-md" style={{width: "100%"}}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h2>
                <div className="grid grid-cols-7 gap-4 mt-4">
                  {days.map((day, i) => (
                    <div key={day} className="text-center">
                      <p className="text-gray-700 dark:text-gray-300"><span style={{ color: props.user.activityLog[i] === 1 ? "lightgreen" : "gray"}}>{format(day, 'dd')}</span></p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white"></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
          <div className="mb-4 flex justify-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow-md" style={{width: "100%", height: "180px"}}>
              <div className="grid grid-cols-3 gap-4 mt-4">

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Language</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{props.user.language || "NA"}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">ELO</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{props.user.elo}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Problems Solved</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{props.user.solved}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Rank</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">#{props.user.rank}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Wins</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{props.user.wins}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Loses</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{props.user.loses}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center" style={{marginTop: "1rem"}}>
            <button onClick={playRanked} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900" style={{width: "50%"}}>
              Play Ranked Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
