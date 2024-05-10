import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Chart as ChartJS } from 'chart.js/auto';

Chart.propTypes = {
  user: PropTypes.object.isRequired,
};

const Chart = (props) => {
  const data = props.user.eloHistory;
  const stats = {
    labels: data.map(d => d),
    datasets: [
      {
        label: 'ELO Rating',
        data: data.map(d => d),
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      }
    ],
  };
  return <Line data={stats} height={200} />;
} 

export default Chart;
