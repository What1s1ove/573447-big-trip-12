import {getUniqueItems} from '../../array';

const getUniqueCities = (events) => {
  const cities = events.map((it) => it.city);
  const uniqueCities = getUniqueItems(cities);

  return uniqueCities;
};

export {getUniqueCities};
