import {getUniqueDates} from '../../date';

const getTripDates = (events) => {
  const tripDates = events.reduce(
      (datesAccumulator, event) => ({
        start: [...datesAccumulator.start, event.start],
        end: [...datesAccumulator.end, event.end],
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
