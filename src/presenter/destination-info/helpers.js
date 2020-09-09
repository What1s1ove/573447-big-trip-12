import {getUniqueItems} from '~/helpers';

const DEFAULT_PRICE = 0;

const getUniqueEventCities = (events) => {
  const cities = events.map((event) => event.destination.city);
  const uniqueCities = getUniqueItems(cities);

  return uniqueCities;
};

const getTotalPrice = (events) => {
  const totalPrice = events.reduce((totalPriceAccumulator, event) => {
    const offersPrice = event.offers.reduce(
        (offersPriceAccumulator, offer) => (offersPriceAccumulator += offer.price),
        DEFAULT_PRICE
    );

    return (totalPriceAccumulator += (event.price + offersPrice));
  }, DEFAULT_PRICE);

  return totalPrice;
};

export {getUniqueEventCities, getTotalPrice};
