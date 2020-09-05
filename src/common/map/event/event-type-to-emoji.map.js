import {EventType} from '~/common/enums';

const eventTypeToEmojiMap = {
  [EventType.TAXI]: `🚕`,
  [EventType.BUS]: `🚌`,
  [EventType.TRAIN]: `🚂`,
  [EventType.SHIP]: `🛳️`,
  [EventType.TRANSPORT]: `🚆`,
  [EventType.DRIVE]: `🚗`,
  [EventType.FLIGHT]: `✈️`,
  [EventType.CHECK_IN]: `🏨`,
  [EventType.SIGHTSEEING]: `🏛️`,
  [EventType.RESTAURANT]: `🍴`,
};

export {eventTypeToEmojiMap};
