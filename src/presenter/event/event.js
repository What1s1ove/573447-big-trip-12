import {renderElement, replaceWithElement, removeElement} from '~/helpers';
import {
  RenderPosition,
  KeyboardKey,
  UserAction,
  UpdateType,
} from '~/common/enums';
import FormEventView from '~/view/form-event/form-event';
import EventView from '~/view/event/event';
import {EventMode} from './common';

class Event {
  constructor({
    containerNode,
    destinations,
    offers,
    changeEvent,
    changeEventMode,
  }) {
    this._containerNode = containerNode;
    this._destinations = destinations;
    this._offers = offers;
    this._changeEvent = changeEvent;
    this._changeEventMode = changeEventMode;

    this.eventMode = EventMode.PREVIEW;

    this.eventComponent = null;
    this.eventFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._editEvent = this._editEvent.bind(this);
    this._deleteEvent = this._deleteEvent.bind(this);
    this._submitForm = this._submitForm.bind(this);
  }

  _initListeners() {
    this._eventComponent.setOnEditClick(this._editEvent);
    this._eventFormComponent.setOnSubmit(this._submitForm);
    this._eventFormComponent.setOnDeleteClick(this._deleteEvent);
  }

  _replaceEventWithForm() {
    replaceWithElement(this._eventComponent, this._eventFormComponent);

    this._changeEventMode();
    this.eventMode = EventMode.EDIT;
  }

  _replaceFormWithEvent() {
    replaceWithElement(this._eventFormComponent, this._eventComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this.eventMode = EventMode.PREVIEW;
  }

  _editEvent() {
    this._replaceEventWithForm();

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _deleteEvent(event) {
    this._changeEvent(UserAction.DELETE_EVENT, UpdateType.MINOR, event);
  }

  _submitForm(event) {
    this._replaceFormWithEvent();
    this._changeEvent(UserAction.UPDATE_EVENT, UpdateType.MINOR, event);
  }

  _onEscKeyDown(evt) {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();

      this._replaceFormWithEvent();
    }
  }

  init(event) {
    this.event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventFormComponent = this._eventFormComponent;

    this._eventComponent = new EventView({event});
    this._eventFormComponent = new FormEventView({
      event,
      destinations: this._destinations,
      offers: this._offers,
    });

    this._initListeners();

    if (!prevEventComponent || !prevEventFormComponent) {
      renderElement(
          this._containerNode,
          this._eventComponent,
          RenderPosition.BEFORE_END
      );

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

  resetView() {
    if (this.eventMode !== EventMode.PREVIEW) {
      this._replaceFormWithEvent();
    }
  }

  destroy() {
    removeElement(this._eventComponent);
    removeElement(this._eventFormComponent);
  }
}

export default Event;
