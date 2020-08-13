import {eventKindToTypeMap, eventKindToPathLabelMap} from '~/common/map';

const getPathLabel = (eventType) => {
  let label = null;

  for (const [kind, types] of Object.entries(eventKindToTypeMap)) {
    const isSuitable = types.some((type) => type === eventType);

    if (isSuitable) {
      label = eventKindToPathLabelMap[kind];

      break;
    }
  }

  return label;
};

export {getPathLabel};
