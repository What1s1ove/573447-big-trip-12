import {EventType} from '~/common/enums';
import {eventTypeToEmojiMap, eventTypeToTextMap} from '../event';

const eventTypeToStatisticLabelMap = {
  [EventType.TAXI]: `${eventTypeToEmojiMap[EventType.TAXI]} ${
    eventTypeToTextMap[EventType.TAXI]
  }`,
  [EventType.BUS]: `${eventTypeToEmojiMap[EventType.BUS]} ${
    eventTypeToTextMap[EventType.BUS]
  }`,
  [EventType.TRAIN]: `${eventTypeToEmojiMap[EventType.TRAIN]} ${
    eventTypeToTextMap[EventType.TRAIN]
  }`,
  [EventType.SHIP]: `${eventTypeToEmojiMap[EventType.SHIP]} ${
    eventTypeToTextMap[EventType.SHIP]
  }`,
  [EventType.TRANSPORT]: `${eventTypeToEmojiMap[EventType.TRANSPORT]} ${
    eventTypeToTextMap[EventType.TRANSPORT]
  }`,
  [EventType.DRIVE]: `${eventTypeToEmojiMap[EventType.DRIVE]} ${
    eventTypeToTextMap[EventType.DRIVE]
  }`,
  [EventType.FLIGHT]: `${eventTypeToEmojiMap[EventType.FLIGHT]} ${
    eventTypeToTextMap[EventType.FLIGHT]
  }`,
  [EventType.CHECK_IN]: `${eventTypeToEmojiMap[EventType.CHECK_IN]} ${
    eventTypeToTextMap[EventType.CHECK_IN]
  }`,
  [EventType.SIGHTSEEING]: `${eventTypeToEmojiMap[EventType.SIGHTSEEING]} ${
    eventTypeToTextMap[EventType.SIGHTSEEING]
  }`,
  [EventType.RESTAURANT]: `${eventTypeToEmojiMap[EventType.RESTAURANT]} ${
    eventTypeToTextMap[EventType.RESTAURANT]
  }`,
};

export {eventTypeToStatisticLabelMap};
