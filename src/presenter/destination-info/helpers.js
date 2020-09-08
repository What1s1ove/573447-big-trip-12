import {getUniqueItems} from '~/helpers';

const DEFAULT_PRICE = 0;

const getUniqueEventCities = (events) => {
  const cities = events.map((it) => it.destination.city);
  const uniqueCities = getUniqueItems(cities);

  return uniqueCities;
};

const getTotalPrice = (events) => {
  const totalPrice = events.reduce((totalPriceAcc, event) => {
    const offersPrice = event.offers.reduce(
        (offersPriceAcc, offer) => (offersPriceAcc += offer.price),
        DEFAULT_PRICE
    );

    return (totalPriceAcc += (event.price + offersPrice));
  }, DEFAULT_PRICE);

  return totalPrice;
};

export {getUniqueEventCities, getTotalPrice};
