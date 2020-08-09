import {eventKindToTypeMap, eventTypeToTextMap} from '~/common/map';

const createEventTypeTemplate = (eventType) => {
  const typeTemplates = Object.entries(eventKindToTypeMap).map(([kind, types]) =>`
    <fieldset class="event__type-group">
      <legend class="visually-hidden">${kind}</legend>
      ${types.map((type) => `
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
        </div>
      `).join(``)}
    </fieldset>
  `).join(``);

  return `
    <div class="event__type-list">
      ${typeTemplates}
    </div>
  `;
};

export {createEventTypeTemplate};
