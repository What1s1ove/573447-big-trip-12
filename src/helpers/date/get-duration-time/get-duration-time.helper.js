import {getDuration} from '../get-duration/get-duration.helper';

const getDurationTime = (start, end) => {
  const duration = getDuration(start, end);

  const day = duration.get(`day`);
  const hours = duration.get(`hour`);
  const minutes = duration.get(`minutes`);

  return `${day > 0 ? `${day}D` : ``} ${hours > 0 ? `${hours}H` : ``} ${minutes}M`;
};

export {getDurationTime};
