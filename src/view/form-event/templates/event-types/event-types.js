import {eventTypeToTextMap} from '~/common/map';

const createEventTypesTemplate = (types, eventType) =>
  types.reduce((template, type) => (template += `
    <div class="event__type-item">
      <input
        id="event-type-${type}-1"
        value=${type}
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        ${eventType === type ? `checked` : ``}
        >
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">
        ${eventTypeToTextMap[type]}
      </label>
    </div>`
  ), ``);

export {createEventTypesTemplate};
