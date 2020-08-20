const getSortedEntities = (entities, compareFn) => {
  const sortedEntities = entities.slice().sort(compareFn);

  return sortedEntities;
};

export {getSortedEntities};
