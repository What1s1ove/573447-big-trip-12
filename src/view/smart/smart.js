import {replaceWithElement} from '~/helpers';
import Abstract from '~/view/abstract/abstract';

class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update) {
    this._data = Object.assign({}, this._data, update);

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.node;
    this.removeElement();

    const newElement = this.node;

    replaceWithElement(prevElement, newElement);
    prevElement = null;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}

export default Smart;
