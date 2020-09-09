import {getFixedDate} from '../get-fixed-date/get-fixed-date.helper';
import {getUniqueItems} from '../../array';

const getUniqueDates = (dates) => {
  const times = dates.map((date) => getFixedDate(date).getTime());
  const uniqueTimes = getUniqueItems(times);
  const uniqueDays = uniqueTimes.map((time) => new Date(time));

  return uniqueDays;
};

export {getUniqueDates};
