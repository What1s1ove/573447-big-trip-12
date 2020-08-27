import {getFixedDate} from '~/helpers';

const getEventsByDay = (events, day) => {
  const eventsByDay = events.filter((event) => {
    const isMathDate = getFixedDate(event.start).getTime() === getFixedDate(day).getTime();

    return isMathDate;
  });

  return eventsByDay;
};

export {getEventsByDay};
