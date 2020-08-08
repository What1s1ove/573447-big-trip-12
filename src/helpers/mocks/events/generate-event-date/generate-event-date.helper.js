import {getRandomNumber} from '~/helpers/number';

const EventDay = {
  DAY: {
    MIN: 0,
    MAX: 4,
  },
  HOURS: {
    MIN: 0,
    MAX: 12,
  },
  MINUTES: {
    MIN: 0,
    MAX: 59,
  },
};

const generateEventDate = () => {
  const startDate = new Date();

  startDate.setDate(
      startDate.getDate() + getRandomNumber(EventDay.DAY.MIN, EventDay.DAY.MAX)
  );
  startDate.setHours(
      startDate.getHours() +
      getRandomNumber(EventDay.HOURS.MIN, EventDay.HOURS.MAX)
  );
  startDate.setMinutes(
      startDate.getMinutes() +
      getRandomNumber(EventDay.MINUTES.MIN, EventDay.MINUTES.MAX)
  );

  const endDate = new Date(startDate);

  endDate.setHours(endDate.getHours() + getRandomNumber(1, EventDay.HOURS.MAX));
  endDate.setMinutes(
      endDate.getMinutes() +
      getRandomNumber(EventDay.MINUTES.MIN, EventDay.MINUTES.MAX)
  );

  return {
    startDate,
    endDate,
  };
};

export {generateEventDate};
