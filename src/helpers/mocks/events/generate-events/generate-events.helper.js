import {generateEvent} from '../generate-event/generate-event.helper';
import {getRandomItem} from '~/helpers/array';

const generateEvents = (destinations, count) => {
  const destination = getRandomItem(destinations);
  const generatedEvents = Array.from(new Array(count), () => generateEvent(destination));

  return generatedEvents;
};

export {generateEvents};
