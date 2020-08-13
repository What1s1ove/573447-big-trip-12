import {getRandomNumber} from '~/helpers/number';

const getRandomItem = (arr) => {
  const randomIdx = getRandomNumber(0, arr.length - 1);

  const randomItem = arr[randomIdx];

  return randomItem;
};

export {getRandomItem};
