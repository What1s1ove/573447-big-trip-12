import {getDuration} from '../../date';

const getEventTypeDurationTotals = (events) => {
  const eventTypeTotalsMap = events.reduce((acc, it) => {
    const {type, start, end} = it;

    const duration = getDuration(start, end);
    const hours = Math.trunc(duration.asHours());

    return Object.assign({}, acc, {
      [type]: {
        type,
        hours: acc[type] ? acc[type].hours + hours : hours,
      },
    });
  }, {});

  return Object.values(eventTypeTotalsMap);
};

export {getEventTypeDurationTotals};
