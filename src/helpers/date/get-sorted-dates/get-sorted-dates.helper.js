import {SortOrder} from '~/common/enums';

const getOrderCb = (order) => {
  let orderCb = null;

  switch (order) {
    case SortOrder.ASC:
      orderCb = (a, b) => new Date(b) - new Date(a);
      break;
    case SortOrder.DESK:
      orderCb = (a, b) => new Date(a) - new Date(b);
      break;
  }

  return orderCb;
};

const getSortedDates = (sortOrder, dates) => {
  const orderCb = getOrderCb(sortOrder);

  const sortedDates = dates.slice().sort(orderCb);

  return sortedDates;
};

export {getSortedDates};
