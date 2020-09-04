import {EventType} from '~/common/enums';

const eventTypeToTextMap = {
  [EventType.TAXI]: `Taxi`,
  [EventType.BUS]: `Bus`,
  [EventType.TRAIN]: `Train`,
  [EventType.SHIP]: `Ship`,
  [EventType.TRANSPORT]: `Transport`,
  [EventType.DRIVE]: `Drive`,
  [EventType.FLIGHT]: `Flight`,
  [EventType.CHECK_IN]: `Check in`,
  [EventType.SIGHTSEEING]: `Sightseeing`,
  [EventType.RESTAURANT]: `Restaurant`,
};

export {eventTypeToTextMap};
