import {generateDestination} from '../generate-destination/generate-destination.helper';

const generateDestinations = (cities) => {
  const destinations = cities.map((it) => generateDestination(it));

  return destinations;
};

export {generateDestinations};
