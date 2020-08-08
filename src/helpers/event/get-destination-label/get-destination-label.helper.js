import {eventTypeToDestinationLabelMap} from '~/common/map';

const getDestinationLabel = (eventType) => {
  let label = null;

  for (const [destinationLabel, types] of Object.entries(
      eventTypeToDestinationLabelMap
  )) {
    const isSuitable = types.some((type) => type === eventType);

    if (isSuitable) {
      label = destinationLabel;

      break;
    }
  }

  return label;
};

export {getDestinationLabel};
