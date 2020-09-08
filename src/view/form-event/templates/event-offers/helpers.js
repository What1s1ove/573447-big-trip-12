const checkIsOfferSelected = (eventOffers, offerByType) => {
  const isSelected = eventOffers.some((it) => it.title === offerByType.title);

  return isSelected;
};

export {checkIsOfferSelected};
