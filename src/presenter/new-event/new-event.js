import {removeElement, renderElement} from '~/helpers';
import {
  KeyboardKey,
  UserAction,
  UpdateType,
  RenderPosition,
} from '~/common/enums';
import FormEventView from '~/view/form-event/form-event';

class NewEvent {
  constructor({container, changeTripAction, offers, destinations}) {
    this._container = container;
    this._destinations = destinations;
    this._offers = offers;
    this._changeTripAction = changeTripAction;

    this.eventFormComponent = null;

    this._submitForm = this._submitForm.bind(this);
    this._closeForm = this._closeForm.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _onEscKeyDown(evt) {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();

      this.destroy();
    }
  }

  _submitForm(event) {
    this._changeTripAction(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        event
    );

    this.destroy();
  }

  _closeForm() {
    this.destroy();
  }

  destroy() {
    if (!this._eventFormComponent) {
      return;
    }

    removeElement(this._eventFormComponent);
    this._eventFormComponent = null;

    if (this._destroyCallback) {
      this._destroyCallback();
    }

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  init(destroyCallback) {
    this._destroyCallback = destroyCallback;

    if (this._eventFormComponent) {
      return;
    }

    this._eventFormComponent = new FormEventView({
      event: null,
      destinations: this._destinations,
      offers: this._offers,
    });

    this._eventFormComponent.setOnSubmit(this._submitForm);
    this._eventFormComponent.setOnDeleteClick(this._closeForm);

    renderElement(
        this._container,
        this._eventFormComponent,
        RenderPosition.AFTER_BEGIN
    );

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }
}

export default NewEvent;
