import {EventType, EventKind} from '~/common/enums';

const eventKindToTypeMap = {
  [EventKind.TRANSFER]: [
    EventType.TAXI,
    EventType.BUS,
    EventType.TRAIN,
    EventType.SHIP,
    EventType.TRANSPORT,
    EventType.DRIVE,
    EventType.FLIGHT,
  ],
  [EventKind.ACTIVITY]: [
    EventType.CHECK_IN,
    EventType.SIGHTSEEING,
    EventType.RESTAURANT,
  ],
};

export {eventKindToTypeMap};
