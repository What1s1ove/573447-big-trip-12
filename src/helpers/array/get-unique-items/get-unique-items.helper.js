const getUniqueItems = (arr) => {
  const uniqueItems = Array.from(new Set(arr));

  return uniqueItems;
};

export {getUniqueItems};
