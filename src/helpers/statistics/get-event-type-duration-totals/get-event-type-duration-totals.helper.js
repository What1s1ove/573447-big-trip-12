import {getDuration} from '../../date';

const getEventTypeDurationTotals = (events) => {
  const eventTypeTotalsMap = events.reduce((durationAccumulator, event) => {
    const {type, start, end} = event;

    const duration = getDuration(start, end);
    const hours = Math.trunc(duration.asHours());

    return Object.assign({}, durationAccumulator, {
      [type]: {
        type,
        hours: durationAccumulator[type] ? durationAccumulator[type].hours + hours : hours,
      },
    });
  }, {});

  return Object.values(eventTypeTotalsMap);
};

export {getEventTypeDurationTotals};
