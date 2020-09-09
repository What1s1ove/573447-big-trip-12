import moment from 'moment';

const checkIsDateEqual = (dateA, dateB) => {
  const isEqual = moment(dateA).isSame(dateB);

  return isEqual;
};

export {checkIsDateEqual};
