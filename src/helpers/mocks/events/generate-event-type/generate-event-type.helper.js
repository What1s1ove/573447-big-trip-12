import {EventType} from '~/common/enums';
import {getRandomItem} from '~/helpers/array';

const eventTypes = Object.values(EventType);

const generateEventType = () => {
  const eventType = getRandomItem(eventTypes);

  return eventType;
};

export {generateEventType};
