import {getRandomItem} from '~/helpers/array';
import {EVENT_CITIES} from '~/common/constants';

const generateEventCity = () => {
  const eventCity = getRandomItem(EVENT_CITIES);

  return eventCity;
};

export {generateEventCity};
