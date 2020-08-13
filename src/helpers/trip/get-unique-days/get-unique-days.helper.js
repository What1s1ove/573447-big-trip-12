import {getUniqueDates} from '../../date';

const getTripDates = (events) => {
  const tripDates = events.reduce(
      (acc, it) => ({
        start: [...acc.start, it.start],
        end: [...acc.end, it.end],
      }),
      {
        start: [],
        end: [],
      }
  );

  return tripDates;
};

const getUniqueTripDays = (events) => {
  const uniqueTripDates = getTripDates(events);

  return {
    start: getUniqueDates(uniqueTripDates.start),
    end: getUniqueDates(uniqueTripDates.end)
  };
};

export {getUniqueTripDays};
