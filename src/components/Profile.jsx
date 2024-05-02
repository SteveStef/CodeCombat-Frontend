import profilePic from '../assets/robo0.png';
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import Chart from './Chart';

/*
const leaderboardData = [
  { name: 'Steve Stef', score: 100, rank: 1 },
  { name: 'Alice Smith', score: 95, rank: 2 },
  { name: 'Bob Johnson', score: 90, rank: 3 },
];
*/

// get this from the database
const colors = [1, 0, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0];

const Profile = () => {
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
                  Steve Stef
                <span className="font-bold" style={{color: "lightblue"}}> (GUARDIAN)</span> 
                </h1>
                <div className="mt-5">
                  <Chart />
                </div>
              </div>
            </div>
            <div className="mb-4 flex justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow-md" style={{width: "100%"}}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h2>
                <div className="grid grid-cols-7 gap-4 mt-4">
                  {days.map((day, i) => (
                    <div key={day} className="text-center">
                      <p className="text-gray-700 dark:text-gray-300"><span style={{ color: colors[i] === 1 ? "lightgreen" : "gray"}}>{format(day, 'dd')}</span></p>
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
                  <p className="text-xl font-bold text-gray-900 dark:text-white">JavaScript</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">ELO</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">1034</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Problems Solved</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">141</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Rank</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">#2</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Wins</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">100</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Loses</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">45</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center" style={{marginTop: "1rem"}}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900" style={{width: "50%"}}>
              Play Ranked Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
