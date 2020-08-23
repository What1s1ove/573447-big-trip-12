import {renderElement, replaceWithElement} from '~/helpers';
import {RenderPosition, KeyboardKey} from '~/common/enums';
import FormEventView from '~/view/form-event/form-event';
import EventView from '~/view/event/event';

class Event {
  constructor() {
    this.eventComponent = null;
    this.eventFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEventEditClick = this._onEventEditClick.bind(this);
    this._onSubmitEventForm = this._onSubmitEventForm.bind(this);
  }

  init(event, dayNode, cities) {
    this.event = event;

    this._eventComponent = new EventView(event);
    this._eventFormComponent = new FormEventView(event, cities);

    this._eventComponent.setOnEditClick(this._onEventEditClick);
    this._eventFormComponent.setOnSubmit(this._onSubmitEventForm);

    renderElement(dayNode, this._eventComponent, RenderPosition.BEFORE_END);
  }

  _replaceEventWithForm() {
    replaceWithElement(this._eventComponent, this._eventFormComponent);
  }

  _replaceFormWithEvent() {
    replaceWithElement(this._eventFormComponent, this._eventComponent);
  }

  _onEventEditClick() {
    this._replaceEventWithForm();

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onSubmitEventForm() {
    this._replaceFormWithEvent();

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();

      this._replaceFormWithEvent();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default Event;
