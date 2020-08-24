import {renderElement, replaceWithElement, removeElement} from '~/helpers';
import {RenderPosition, KeyboardKey} from '~/common/enums';
import FormEventView from '~/view/form-event/form-event';
import EventView from '~/view/event/event';
import {EventMode} from './common';

class Event {
  constructor(dayContainerNode, changeEvent) {
    this._dayContainerNode = dayContainerNode;
    this._changeEvent = changeEvent;

    this.eventMode = EventMode.PREVIEW;

    this.eventComponent = null;
    this.eventFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onEventEditClick = this._onEventEditClick.bind(this);
    this._onSubmitEventForm = this._onSubmitEventForm.bind(this);
  }

  _initListeners() {
    this._eventComponent.setOnEditClick(this._onEventEditClick);
    this._eventFormComponent.setOnSubmit(this._onSubmitEventForm);
  }

  _replaceEventWithForm() {
    replaceWithElement(this._eventComponent, this._eventFormComponent);

    this.eventMode = EventMode.EDIT;
  }

  _replaceFormWithEvent() {
    replaceWithElement(this._eventFormComponent, this._eventComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this.eventMode = EventMode.PREVIEW;
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

  init(event, destinations) {
    this.event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventFormComponent = this._eventFormComponent;

    this._eventComponent = new EventView(event);
    this._eventFormComponent = new FormEventView(event, destinations);

    this._initListeners();

    if (!prevEventComponent || !prevEventFormComponent) {
      renderElement(this._dayContainerNode, this._eventComponent, RenderPosition.BEFORE_END);

      return;
    }

    switch (this.eventMode) {
      case EventMode.PREVIEW:
        replaceWithElement(prevEventComponent, this._eventComponent);
        break;
      case EventMode.EDIT:
        replaceWithElement(prevEventFormComponent, this._eventFormComponent);
        break;
    }

    removeElement(prevEventComponent);
    removeElement(prevEventFormComponent);
  }

  destroy() {
    removeElement(this._eventComponent);
    removeElement(this._eventFormComponent);
  }
}

export default Event;
