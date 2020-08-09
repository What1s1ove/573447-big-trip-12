import {getFixedDate} from '../../date';
import {getUniqueItems} from '../../array';

const getUniqueDays = (events) => {
  const times = events.map((it) => getFixedDate(it.start).getTime());
  const uniqueTimes = getUniqueItems(times);
  const uniqueDays = uniqueTimes.map((it) => new Date(it));

  return uniqueDays;
};

export {getUniqueDays};
