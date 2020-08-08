import {EventType, EventDestinationLabel} from '~/common/enums';

const eventTypeToDestinationLabelMap = {
  [EventDestinationLabel.TO]: [
    EventType.TAXI,
    EventType.BUS,
    EventType.TRAIN,
    EventType.SHIP,
    EventType.TRANSPORT,
    EventType.DRIVE,
    EventType.FLIGHT,
  ],
  [EventDestinationLabel.IN]: [
    EventType.CHECK_IN,
    EventType.SIGHTSEEING,
    EventType.RESTAURANT,
  ],
};

export {eventTypeToDestinationLabelMap};
