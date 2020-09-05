import {EventKind} from '~/common/enums';
import {eventKindToTypeMap} from '~/common/map';

const INCREMENT_TRANSPORT_VALUE = 1;

const eventTransportsTypes = Object.values(eventKindToTypeMap[EventKind.TRANSFER]);

const getEventTypeTransportTotals = (events) => {
  const eventTypeTotalsMap = events.reduce((acc, it) => {
    const {type} = it;
    const isTransportType = eventTransportsTypes.includes(type);

    return isTransportType
      ? Object.assign({}, acc, {
        [type]: {
          type,
          totals: acc[type] ? acc[type].totals + INCREMENT_TRANSPORT_VALUE : INCREMENT_TRANSPORT_VALUE,
        },
      })
      : acc;
  }, {});

  return Object.values(eventTypeTotalsMap);
};

export {getEventTypeTransportTotals};
