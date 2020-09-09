import {EventKind} from '~/common/enums';
import {eventKindToTypeMap} from '~/common/map';

const INCREMENT_TRANSPORT_VALUE = 1;

const eventTransportsTypes = Object.values(eventKindToTypeMap[EventKind.TRANSFER]);

const getEventTypeTransportTotals = (events) => {
  const eventTypeTotalsMap = events.reduce((transportAccumulator, event) => {
    const {type} = event;
    const isTransportType = eventTransportsTypes.includes(type);

    return isTransportType
      ? Object.assign({}, transportAccumulator, {
        [type]: {
          type,
          totals: transportAccumulator[type]
            ? transportAccumulator[type].totals + INCREMENT_TRANSPORT_VALUE
            : INCREMENT_TRANSPORT_VALUE,
        },
      })
      : transportAccumulator;
  }, {});

  return Object.values(eventTypeTotalsMap);
};

export {getEventTypeTransportTotals};
