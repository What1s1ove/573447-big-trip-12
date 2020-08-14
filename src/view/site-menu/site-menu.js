import {createElement} from '~/helpers';
import {AppNavigation} from '~/common/enums';

class SiteMenu {
  constructor(menuItems) {
    this.menuItems = menuItems;
    this.activeItem = AppNavigation.TABLE;
    this._element = null;
  }

  get node() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${this.menuItems.reduce((acc, it) => (acc.concat(`
          <a
            class="trip-tabs__btn ${it === this.activeItem ? `trip-tabs__btn--active` : ``}"
            href="#"
          >
            ${it}
          </a>
        `)), ``)}
      </nav>
    `;
  }
}

export default SiteMenu;
