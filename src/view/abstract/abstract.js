import {createElement} from '~/helpers';

const SHAKE_ANIMATION_TIMEOUT = 600;

class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callbacks = {};
  }

  get node() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  shake(callback) {
    this.node.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.node.style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  removeElement() {
    this._element = null;
  }
}

export default Abstract;
