import Abstract from '~/view/abstract/abstract';
import {AppNavigation} from '~/common/enums';

class SiteMenu extends Abstract {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
    this._activeItem = AppNavigation.TABLE;
  }

  get template() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${this._menuItems.reduce((acc, it) => (acc.concat(`
          <a
            class="trip-tabs__btn ${it === this._activeItem ? `trip-tabs__btn--active` : ``}"
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
