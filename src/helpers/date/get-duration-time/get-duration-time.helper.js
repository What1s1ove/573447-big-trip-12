import moment from 'moment';

const getDurationTime = (start, end) => {
  const a = moment(start);
  const b = moment(end);

  const duration = moment.duration(b.diff(a));

  const day = duration.get(`day`);
  const hours = duration.get(`hour`);
  const minutes = duration.get(`minutes`);

  return `${day > 0 ? `${day}D` : ``} ${hours > 0 ? `${hours}H` : ``} ${minutes}M`;
};

export {getDurationTime};
