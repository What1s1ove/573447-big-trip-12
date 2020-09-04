const getEventTypePriceTotals = (events) => {
  const eventTypeTotalsMap = events.reduce((acc, it) => {
    const {type, price} = it;

    return Object.assign({}, acc, {
      [type]: {
        type,
        price: acc[type] ? acc[type].price + price : price,
      },
    });
  }, {});

  return Object.values(eventTypeTotalsMap);
};

export {getEventTypePriceTotals};
