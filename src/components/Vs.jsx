import { useState, useEffect } from 'react';
import profilePic from '../assets/robo0.png';
import Header from './Header';

const Vs = () => {
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if(prevTimer === 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  } , []);

 return (

    <div>
      <Header />

      <div className="absolute top-500 right-500 z-50 p-2 border-t-4 border-blue-500 bg-gray-100 rounded-md flex items-center justify-center text-bold text-2xl">
        Match Starting in {timer} seconds
      </div>

      <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-2md mx-auto">
        <div className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <div className="mb-4 flex justify-center">
              <div className="flex flex-col">
                <h1 className="text-center text-xl font-bold text-gray-900 dark:text-white">
                      Username
                  <span className="font-bold" style={{color: "lightblue"}}> (GUARDIAN)</span> 
                </h1>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow-md" style={{width: "100%", height: "180px"}}>
              <div className="grid grid-cols-3 gap-4 mt-4">

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Language</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{"NA"}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">ELO</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">230</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Problems Solved</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">40</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Rank</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">#4</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Wins</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">120</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Loses</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">100</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <span style={{color: "white", fontWeight: "bold"}}>VS</span>
        <div className="w-full max-w-2md mx-auto">
          {/* Second Profile Card */}
          <div className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            {/* Content of the second profile card */}
          <div className="flex flex-row items-center justify-between">
            <div className="mb-4 flex justify-center">
              <div className="flex flex-col">
                <h1 className="text-center text-xl font-bold text-gray-900 dark:text-white">
                      Username
                  <span className="font-bold" style={{color: "lightblue"}}> (343)</span> 
                </h1>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow-md" style={{width: "100%", height: "180px"}}>
              <div className="grid grid-cols-3 gap-4 mt-4">

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Language</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{"NA"}</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">ELO</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">230</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Problems Solved</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">40</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Rank</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">#4</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Wins</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">120</p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 dark:text-gray-300">Loses</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
 );
}

export default Vs;