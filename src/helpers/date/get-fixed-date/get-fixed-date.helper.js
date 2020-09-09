const getFixedDate = (date) => {
  const localDate = new Date(date);

  localDate.setHours(23, 59, 59, 999);

  return localDate;
};

export {getFixedDate};
