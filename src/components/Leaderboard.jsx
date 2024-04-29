const leaderboardData = [
 { name: 'Steve Stef', score: 100, rank: 1 },
 { name: 'Alice Smith', score: 95, rank: 2 },
 { name: 'Bob Johnson', score: 90, rank: 3 },
];
const Leaderboard = () => {
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-700 shadow-md rounded px-10 pt-8 pb-10 mb-6 flex flex-col overflow-y-auto" style={{maxHeight: "700px"}}> {/* Set max height and make scrollable */}
          <div className="flex flex-row items-center justify-between">
            <div className="mb-6 flex justify-center">
              <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
            </div>
          </div>
          <div className="flex flex-col">
            {leaderboardData.map((person, index) => (
              <div key={index} className="flex flex-row items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <div className="text-gray-900 dark:text-white font-bold text-xl">{person.rank}. {person.name}</div>
                <div className="text-gray-600 dark:text-gray-400 font-bold text-xl">{person.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
 );
};

export default Leaderboard;
