const getDaysDiff = (seconds) => {
  const daysDiff = Math.floor(seconds / 60 / 60 / 24);

  return daysDiff;
};

const getHoursDiff = (seconds) => {
  const hoursDiff = Math.floor((seconds / 60 / 60) % 24);

  return hoursDiff;
};

const getMinutesDiff = (seconds) => {
  const minutesDiff = Math.floor((seconds / 60) % 60);

  return minutesDiff;
};

const getTwoDigitalTime = (number) => {
  const twoDigitalFormatted = number < 10 ? `0${number}` : number;

  return twoDigitalFormatted;
};

const getDurationTime = (start, end) => {
  const diffInSeconds = Math.abs(new Date(end) - new Date(start)) / 1000;

  const times = [
    {label: `D`, time: getDaysDiff(diffInSeconds)},
    {label: `H`, time: getHoursDiff(diffInSeconds)},
    {label: `M`, time: getMinutesDiff(diffInSeconds)},
  ];

  return times
    .map(({time, label}) => (time ? `${getTwoDigitalTime(time)}${label} ` : ``))
    .join(``);
};

export {getDurationTime};
