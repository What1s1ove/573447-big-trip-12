const getSyncedEvents = (syncEventPayloads) => {
  const syncedEvents = syncEventPayloads.reduce(
      (eventsAccumulator, syncEventPayload) =>
        syncEventPayload.success
          ? [...eventsAccumulator, syncEventPayload.payload]
          : eventsAccumulator,
      []
  );

  return syncedEvents;
};

const createEventStoreStructure = (events) => {
  return events.reduce((eventsAccumulator, event) => {
    return Object.assign({}, eventsAccumulator, {
      [event.id]: event,
    });
  }, {});
};

export {getSyncedEvents, createEventStoreStructure};
