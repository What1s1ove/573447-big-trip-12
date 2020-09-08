import {StorageItemPrefix} from './common';

class Store {
  constructor({key, storage}) {
    this._storage = storage;
    this._storeKey = key;
  }

  get events() {
    try {
      return JSON.parse(this._storage.getItem(this._getStorageKey(StorageItemPrefix.EVENTS))) || {};
    } catch (err) {
      return {};
    }
  }

  set events(events) {
    this._storage.setItem(
        this._getStorageKey(StorageItemPrefix.EVENTS),
        JSON.stringify(events)
    );
  }

  get destinations() {
    try {
      return JSON.parse(this._storage.getItem(this._getStorageKey(StorageItemPrefix.DESTINATIONS))) || [];
    } catch (err) {
      return [];
    }
  }

  set destinations(destinations) {
    this._storage.setItem(
        this._getStorageKey(StorageItemPrefix.DESTINATIONS),
        JSON.stringify(destinations)
    );
  }

  get offers() {
    try {
      return JSON.parse(this._storage.getItem(this._getStorageKey(StorageItemPrefix.OFFERS))) || [];
    } catch (err) {
      return [];
    }
  }

  set offers(offers) {
    this._storage.setItem(
        this._getStorageKey(StorageItemPrefix.OFFERS),
        JSON.stringify(offers)
    );
  }

  setEvent(id, payload) {
    const eventsStore = this.events;

    this._storage.setItem(
        this._getStorageKey(StorageItemPrefix.EVENTS),
        JSON.stringify(
            Object.assign({}, eventsStore, {
              [id]: payload,
            })
        )
    );
  }

  removeEvent(id) {
    const eventsStore = this.events;

    delete eventsStore[id];

    this._storage.setItem(this._getStorageKey(StorageItemPrefix.EVENTS), JSON.stringify(eventsStore));
  }

  _getStorageKey(prefix) {
    return `${this._storeKey}-${prefix}`;
  }

}

export default Store;
