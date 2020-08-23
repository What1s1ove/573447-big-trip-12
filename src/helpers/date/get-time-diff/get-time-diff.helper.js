const getTimeDiff = (dateA, dateB) => {
  const timeDiff = new Date(dateA) - new Date(dateB);

  return timeDiff;
};

export {getTimeDiff};
