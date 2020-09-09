const getEventTypePriceTotals = (events) => {
  const eventTypeTotalsMap = events.reduce((priceAccumulator, event) => {
    const {type, price} = event;

    return Object.assign({}, priceAccumulator, {
      [type]: {
        type,
        price: priceAccumulator[type] ? priceAccumulator[type].price + price : price,
      },
    });
  }, {});

  return Object.values(eventTypeTotalsMap);
};

export {getEventTypePriceTotals};
