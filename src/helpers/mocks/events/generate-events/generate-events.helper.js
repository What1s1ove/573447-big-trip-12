import {getRandomItem} from '~/helpers/array';
import {generateEvent} from '../generate-event/generate-event.helper';

const generateEvents = (count, destinations, offers) => {
  const destination = getRandomItem(destinations);

  const generatedEvents = Array.from(new Array(count), () =>
    generateEvent(destination, offers)
  );

  return generatedEvents;
};

export {generateEvents};
