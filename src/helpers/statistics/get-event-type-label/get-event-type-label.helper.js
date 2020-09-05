import {eventTypeToStatisticLabelMap} from '~/common/map';

const getEventTypeLabel = (eventType) => {
  const eventTypeLabel = eventTypeToStatisticLabelMap[eventType].toUpperCase();

  return eventTypeLabel;
};

export {getEventTypeLabel};
