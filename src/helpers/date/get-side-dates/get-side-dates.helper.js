const getSideDates = (dates) => {
  const sideDates = dates.reduce(
      (datesAccumulator, date) => ({
        min: new Date(Math.min(datesAccumulator.min || Number.MAX_VALUE, date)),
        max: new Date(Math.max(datesAccumulator.max || Number.MIN_VALUE, date)),
      }),
      {
        min: null,
        max: null,
      }
  );

  return sideDates;
};

export {getSideDates};
