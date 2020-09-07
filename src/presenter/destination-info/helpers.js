import {getUniqueItems} from '~/helpers';

const getUniqueEventCities = (events) => {
  const cities = events.map((it) => it.destination.city);
  const uniqueCities = getUniqueItems(cities);

  return uniqueCities;
};

export {getUniqueEventCities};
