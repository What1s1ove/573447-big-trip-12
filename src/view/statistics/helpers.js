import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  getSortedEntities,
  getEventTypePriceTotals,
  getEventTypeTransportTotals,
  getEventTypeDurationTotals,
  getEventTypeLabels
} from '~/helpers';

const BAR_HEIGHT = 55;

const initMoneyChart = (canvasNode, events) => {
  const eventTypeTotals = getEventTypePriceTotals(events);
  const sortedTotals = getSortedEntities(eventTypeTotals, (a, b) => b.price - a.price);
  const chartLabels = getEventTypeLabels(sortedTotals.map((total) => total.type));
  const chartPriceValues = sortedTotals.map((total) => total.price);

  canvasNode.height = BAR_HEIGHT * chartLabels.length;

  return new Chart(canvasNode, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels,
      datasets: [
        {
          data: chartPriceValues,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const initTransportChart = (canvasNode, events) => {
  const eventTransportTotals = getEventTypeTransportTotals(events);
  const sortedTotals = getSortedEntities(eventTransportTotals, (a, b) => b.totals - a.totals);
  const chartLabels = getEventTypeLabels(sortedTotals.map((total) => total.type));
  const chartTransportValues = sortedTotals.map((total) => total.totals);

  canvasNode.height = BAR_HEIGHT * chartLabels.length;

  return new Chart(canvasNode, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels,
      datasets: [
        {
          data: chartTransportValues,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const initTimeSpendChart = (canvasNode, events) => {
  const eventTypeDurationTotals = getEventTypeDurationTotals(events);
  const sortedTotals = getSortedEntities(eventTypeDurationTotals, (a, b) => b.hours - a.hours);
  const chartLabels = getEventTypeLabels(sortedTotals.map((total) => total.type));
  const chartTimeSpendValues = sortedTotals.map((total) => total.hours);

  canvasNode.height = BAR_HEIGHT * chartLabels.length;

  return new Chart(canvasNode, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels,
      datasets: [
        {
          data: chartTimeSpendValues,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}h`,
        },
      },
      title: {
        display: true,
        text: `TIME SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export {initMoneyChart, initTransportChart, initTimeSpendChart};
