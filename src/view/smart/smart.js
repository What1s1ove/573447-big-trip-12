import {replaceWithElement} from '~/helpers';
import Abstract from '~/view/abstract/abstract';

class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, isJustDataUpdating = false) {
    this._data = Object.assign({}, this._data, update);

    if (isJustDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.node;
    this.removeElement();

    const newElement = this.node;

    replaceWithElement(prevElement, newElement);
    prevElement = null;

    this._restoreListeners();
  }

  _restoreListeners() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}

export default Smart;
