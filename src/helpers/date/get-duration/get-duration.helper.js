import moment from 'moment';

const getDuration = (start, end) => {
  const a = moment(start);
  const b = moment(end);

  const duration = moment.duration(b.diff(a));

  return duration;
};

export {getDuration};
