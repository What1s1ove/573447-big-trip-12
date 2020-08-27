const updateItem = (items, item, key) => {
  const updatedItems = items.map((it) => (it[key] === item[key] ? item : it));

  return updatedItems;
};

export {updateItem};
