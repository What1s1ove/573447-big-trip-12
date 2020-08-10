const getSideDates = (dates) => {
  const sideDates = dates.reduce(
      (acc, date) => ({
        min: new Date(Math.min(acc.min || Number.MAX_VALUE, date)),
        max: new Date(Math.max(acc.max || Number.MIN_VALUE, date)),
      }),
      {
        min: null,
        max: null,
      }
  );

  return sideDates;
};

export {getSideDates};
