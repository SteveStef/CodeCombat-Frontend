import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const data = [
  {
    id: 1,
    year: 2021,
    elo: 0,
  },
  {
    id: 2,
    year: 2022,
    elo: 2,
  },
  {
    id: 3,
    year: 2023,
    elo: 13,
  },
  {
    id: 4,
    year: 2024,
    elo: 29,
  },
  {
    id: 5,
    year: 2025,
    elo: 22,
  },
  {
    id: 6,
    year: 2026,
    elo: 25,
  },

]

const stats = {
  labels: data.map(d => d.year),
  datasets: [
    {
      label: 'ELO Rating',
      data: data.map(d => d.elo),
      fill: false,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
    }
  ],
};

// make the line chart ratio responsive
const Chart = () => {
  return <Line data={stats} height={200} />;
} 

export default Chart;
