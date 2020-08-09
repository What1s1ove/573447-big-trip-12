const getSortedDates = (dates) => {
  const sortedDates = dates.slice().sort((a, b) => new Date(a) - new Date(b));

  return sortedDates;
};

export {getSortedDates};
