const getUniqueItems = (items) => {
  const uniqueItems = Array.from(new Set(items));

  return uniqueItems;
};

export {getUniqueItems};
