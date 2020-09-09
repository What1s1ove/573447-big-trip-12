import {AppNavigation} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

const MENU_ITEM_DATA_ATTR = `data-menu-item`;
const ACTIVE_ITEM_CLASS = `trip-tabs__btn--active`;

class SiteMenu extends Abstract {
  constructor({menuItems}) {
    super();
    this._menuItems = menuItems;
    this._activeItem = AppNavigation.TABLE;

    this._onItemClick = this._onItemClick.bind(this);
  }

  get template() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        ${this._menuItems.reduce((template, menuItem) => (template.concat(`
          <a
            class="trip-tabs__btn ${menuItem === this._activeItem ? ACTIVE_ITEM_CLASS : ``}"
            ${MENU_ITEM_DATA_ATTR}="${menuItem}"
            href="#"
          >
            ${menuItem}
          </a>
        `)), ``)}
      </nav>
    `;
  }

  setOnItemClick(callback) {
    this._callbacks.changeMenuItem = callback;

    this.node.addEventListener(`click`, this._onItemClick);
  }

  setMenuItem(menuItem) {
    const menuItemNodes = this.node.querySelectorAll(`.trip-tabs__btn`);

    menuItemNodes.forEach((node) =>
      node.getAttribute(MENU_ITEM_DATA_ATTR) === menuItem
        ? node.classList.add(ACTIVE_ITEM_CLASS)
        : node.classList.remove(ACTIVE_ITEM_CLASS)
    );
  }

  _onItemClick({target}) {
    const hasAttr = target.hasAttribute(MENU_ITEM_DATA_ATTR);

    if (!hasAttr) {
      return;
    }

    this._callbacks.changeMenuItem(target.getAttribute(MENU_ITEM_DATA_ATTR));
  }
}

export default SiteMenu;
