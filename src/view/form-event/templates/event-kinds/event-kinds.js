import {eventKindToTypeMap} from '~/common/map';
import {createEventTypesTemplate} from '../event-types/event-types';

const createEventKindsTemplate = (eventType) => {
  const typeTemplates = Object
    .entries(eventKindToTypeMap)
    .reduce((acc, [kind, types]) => (acc.concat(`
      <fieldset class="event__type-group">
        <legend class="visually-hidden">${kind}</legend>
          ${createEventTypesTemplate(types, eventType)}
      </fieldset>
    `)), ``);

  return `
    <div class="event__type-list">
      ${typeTemplates}
    </div>
  `;
};

export {createEventKindsTemplate};
