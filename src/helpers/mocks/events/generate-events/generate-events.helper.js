import {generateEvent} from '../generate-event/generate-event.helper';

const generateEvents = (count) => {
  const generatedEvents = Array.from(new Array(count), () => generateEvent());

  return generatedEvents;
};

export {generateEvents};
