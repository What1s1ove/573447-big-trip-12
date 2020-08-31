import moment from 'moment';

const filterEventsByPastCb = (event) => {
  const now = new Date();
  const isSuit = moment(now).isAfter(event.end);

  return isSuit;
};

const filterEventsByFutureCb = (event) => {
  const now = new Date();
  const isSuit = moment(event.start).isAfter(now);

  return isSuit;
};

export {filterEventsByPastCb, filterEventsByFutureCb};
