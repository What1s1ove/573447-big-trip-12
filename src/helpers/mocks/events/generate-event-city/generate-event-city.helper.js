import {getRandomItem} from '~/helpers/array';

const CITIES = [`San Francisco`, `London`, `Paris`, `Berlin`, `Miami`];

const generateEventCity = () => {
  const eventCity = getRandomItem(CITIES);

  return eventCity;
};

export {generateEventCity};
