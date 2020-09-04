import {getEventTypeLabel} from '../get-event-type-label/get-event-type-label.helper';

const getEventTypeLabels = (eventTypes) => {
  const eventTypeLabels = eventTypes.map(getEventTypeLabel);

  return eventTypeLabels;
};

export {getEventTypeLabels};
