import {renderElement, replaceWithElement} from '~/helpers';
import {RenderPosition, KeyboardKey} from '~/common/enums';
import FormEventView from '~/view/form-event/form-event';
import EventView from '~/view/event/event';

class Event {
  constructor(dayContainerNode, changeEvent) {
    this._dayContainerNode = dayContainerNode;
    this._changeEvent = changeEvent;

    this.eventComponent = null;
    this.eventFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEventEditClick = this._onEventEditClick.bind(this);
    this._onSubmitEventForm = this._onSubmitEventForm.bind(this);
  }

  init(event, cities) {
    this.event = event;

    this._eventComponent = new EventView(event);
    this._eventFormComponent = new FormEventView(event, cities);

    this._eventComponent.setOnEditClick(this._onEventEditClick);
    this._eventFormComponent.setOnSubmit(this._onSubmitEventForm);

    renderElement(this._dayContainerNode, this._eventComponent, RenderPosition.BEFORE_END);
  }

  _replaceEventWithForm() {
    replaceWithElement(this._eventComponent, this._eventFormComponent);
  }

  _replaceFormWithEvent() {
    replaceWithElement(this._eventFormComponent, this._eventComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEventEditClick() {
    this._replaceEventWithForm();

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onSubmitEventForm(event) {
    this._replaceFormWithEvent();
    this._changeEvent(event);
  }

  _onEscKeyDown(evt) {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();

      this._replaceFormWithEvent();
    }
  }
}

export default Event;
