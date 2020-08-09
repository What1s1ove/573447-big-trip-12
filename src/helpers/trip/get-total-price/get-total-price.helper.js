const getTotalPrice = (events) => {
  const totalPrice = events.reduce((totalPriceAcc, event) => {
    const offersPrice = event.offers.reduce(
        (offersPriceAcc, offer) =>
          (offersPriceAcc += offer.isChecked ? offer.price : 0),
        0
    );

    return (totalPriceAcc += (event.price + offersPrice));
  }, 0);

  return totalPrice;
};

export {getTotalPrice};
