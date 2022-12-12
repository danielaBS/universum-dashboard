import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ labels, info }) => {
  const infoFixed = info.map((e) => e.toFixed(2));

  const data = {
    labels: [
      'Directivo',
      'Docente',
      'Estudiante',
      'Otros',
      'Padre de familia',
      'Profesional de apoyo',
    ],
    datasets: [
      {
        label: labels,
        data: infoFixed,
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
        borderColor: [
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
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      datalabels: {
        color: '#323232',
        anchor: 'center',
        align: 'center',
        font: {
          size: 12,
          weight: '400',
        },
      },
      legend: {
        display: true,
        color: 'black',
        position: 'right',
        labels: {
          font: {
            family: 'Inter-Regular',
          },
        },
      },
    },
  };
  return (
    <>
      <Doughnut data={data} plugins={[ChartDataLabels]} options={options} />
    </>
  );
};

export default DoughnutChart;

DoughnutChart.propTypes = {
  labels: PropTypes.array.isRequired,
  info: PropTypes.array.isRequired,
};

DoughnutChart.defaultProps = {
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
