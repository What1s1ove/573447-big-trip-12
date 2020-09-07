const getSyncedEvents = (items) => {
  const syncedEvents = items.reduce(
      (acc, it) => (it.success ? [...acc, it.payload] : acc),
      []
  );

  return syncedEvents;
};

const createEventStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export {getSyncedEvents, createEventStoreStructure};
