import {renderElement, removeElement, replaceWithElement} from '~/helpers';
import {UpdateType, EventFilterType, RenderPosition} from '~/common/enums';
import {FilterTypeToFilterCbMap} from '~/common/map';
import FilterView from '~/view/filter/filter';

const filters = Object.values(EventFilterType);

class Filter {
  constructor({containerNode, filterModel, eventsModel}) {
    this._filterContainerNode = containerNode;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._currentFilter = null;

    this._filterComponent = null;

    this._changeModelEvent = this._changeModelEvent.bind(this);
    this._changeFilterType = this._changeFilterType.bind(this);

    this._filterModel.addObserver(this._changeModelEvent);
    this._eventsModel.addObserver(this._changeModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.filter;

    const filterEntities = this._getFilterEntities();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView({
      filters: filterEntities,
      currentFilter: this._currentFilter,
    });

    this._filterComponent.setOnChangeFilter(this._changeFilterType);

    if (!prevFilterComponent) {
      renderElement(
          this._filterContainerNode,
          this._filterComponent,
          RenderPosition.AFTER_END
      );

      return;
    }

    replaceWithElement(prevFilterComponent, this._filterComponent);

    removeElement(prevFilterComponent);
  }

  _changeModelEvent() {
    this.init();
  }

  _changeFilterType(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilterEntities() {
    const {events} = this._eventsModel;

    const filterEntities = filters.map((it) => ({
      name: it,
      isDisabled: !FilterTypeToFilterCbMap[it](events).length,
    }));

    return filterEntities;
  }
}

export default Filter;
