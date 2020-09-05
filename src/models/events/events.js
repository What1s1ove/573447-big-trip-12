import {Observer} from '~/helpers';
import DestinationsModel from '../destinations/destinations';

class Events extends Observer {
  constructor() {
    super();

    this._events = [];
  }

  static adaptToClient(event) {
    const adaptedEvent = {
      id: event.id,
      destination: DestinationsModel.adaptToClient(event.destination),
      price: event.base_price,
      start: new Date(event.date_from),
      end: new Date(event.date_to),
      isFavorite: event.is_favorite,
      offers: event.offers,
      type: event.type,
    };

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = {
      // ! because of camelcase eslint rul
      'id': event.id,
      'destination': DestinationsModel.adaptToServer(event.destination),
      'base_price': event.price,
      'date_from': event.start.toISOString(),
      'date_to': event.end.toISOString(),
      'is_favorite': event.isFavorite,
      'offers': event.offers,
      'type': event.type,
    };

    return adaptedEvent;
  }

  get events() {
    return this._events;
  }

  setEvents(updateType, events) {
    this._events = events.slice();

    this._notify(updateType);
  }

  updateEvent(updateType, event) {
    this._events = this._events.map((it) => (it.id === event.id ? event : it));

    this._notify(updateType, event);
  }

  addEvent(updateType, event) {
    this._events = [event, ...this._events];

    this._notify(updateType, event);
  }

  deleteEvent(updateType, event) {
    this._events = this._events.filter((it) => it.id !== event.id);

    this._notify(updateType, event);
  }
}

export default Events;
