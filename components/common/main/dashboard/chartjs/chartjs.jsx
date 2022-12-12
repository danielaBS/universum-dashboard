import { Bar } from 'react-chartjs-2';
import React from 'react';
import PropTypes from 'prop-types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useRef } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chartjs = ({ labels, info }) => {
  const chartRef = useRef(null);
  const infoFixed = info.map((e) => e.toFixed(2));
  const data = {
    labels: labels,
    datasets: [
      {
        type: 'bar',
        label: 'Promedio',
        backgroundColor: [
          '#caf0f3',
          '#a4e2e7',
          '#77d0d8',
          '#50bdc7',
          '#31b8bf',
          '#00a4ad',
          '#028188',
          '#005a5f',
          '#01383',
        ],
        // backgroundColor: colorArray,
        data: infoFixed,
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    // animation: false,
    plugins: {
      datalabels: {
        color: '#323232',
        anchor: 'end',
        align: 'top',
        font: {
          size: 12,
          weight: '400',
        },
      },
      legend: {
        display: true,
        color: 'black',
        labels: {
          font: {
            family: 'Inter-Regular',
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 4,
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} plugins={[ChartDataLabels]} ref={chartRef}></Bar>
    </>
  );
};

export default Chartjs;

Chartjs.propTypes = {
  labels: PropTypes.array,
  info: PropTypes.array,
};

Chartjs.defaultProps = {
  labels: [
    'Directivo',
    'Docente',
    'Estudiante',
    'Otros',
    'Padre de familia',
    'Profesional de apoyo',
  ],
  info: [3, 2.8, 3.2, 3.5, 3.4, 3],
};
