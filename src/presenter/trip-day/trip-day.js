import {updateItem, removeElement, renderElement} from '~/helpers';
import {RenderPosition} from '~/common/enums';
import EventPresenter from '~/presenter/event/event';
import TripDayView from '~/view/trip-day/trip-day';
import TripDayEventsListView from '~/view/trip-day-events-list/trip-day-events-list';
import TripDayEventsItemView from '~/view/trip-day-events-item/trip-day-event-item';

class TripDay {
  constructor(daysContainerNode, tripDestinations, day, dayNumber) {
    this._daysContainerNode = daysContainerNode;
    this._day = day;
    this._dayNumber = dayNumber;
    this._tripDestinations = tripDestinations;
    this._eventPresenters = {};

    this._tripDayComponent = null;
    this._tripDayEventsListComponent = null;

    this._updateEvent = this._updateEvent.bind(this);
  }

  _renderEvent(event) {
    const tripDayEventsItemComponent = new TripDayEventsItemView();
    const eventPresenter = new EventPresenter(
        tripDayEventsItemComponent.node,
        this._updateEvent,
        this._changeEventMode
    );

    renderElement(
        this._tripDayEventsListComponent,
        tripDayEventsItemComponent,
        RenderPosition.BEFORE_END
    );

    eventPresenter.init(event, this._tripDestinations);

    this._eventPresenters[event.id] = eventPresenter;
  }

  _updateEvent(event) {
    this._tripEvents = updateItem(this._tripEvents, event, `id`);

    this._eventPresenters[event.id].init(event, this._tripDestinations);
  }

  _renderEvents(events) {
    events.forEach((it) => this._renderEvent(it));
  }

  _clearEvents() {
    Object.values(this._eventPresenters).forEach((it) => it.destroy());

    this._eventPresenters = {};
  }

  init(events) {
    this._events = events;

    this._tripDayComponent = new TripDayView(this._day, this._dayNumber);
    this._tripDayEventsListComponent = new TripDayEventsListView();

    renderElement(
        this._daysContainerNode,
        this._tripDayComponent,
        RenderPosition.BEFORE_END
    );

    renderElement(
        this._tripDayComponent,
        this._tripDayEventsListComponent,
        RenderPosition.BEFORE_END
    );

    this._renderEvents(this._events);
  }

  destroy() {
    this._clearEvents();

    removeElement(this._tripDayComponent);
    removeElement(this._tripDayEventsListComponent);
  }
}

export default TripDay;
