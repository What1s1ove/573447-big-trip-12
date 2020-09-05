import {Observer} from '~/helpers';

class Destinations extends Observer {
  constructor() {
    super();

    this._destinations = [];
  }

  static adaptToClient(destination) {
    const adaptedDestination = {
      city: destination.name,
      description: destination.description,
      photos: destination.pictures,
    };

    return adaptedDestination;
  }

  static adaptToServer(destination) {
    const adaptedDestination = {
      name: destination.city,
      description: destination.description,
      pictures: destination.photos,
    };

    return adaptedDestination;
  }

  set destinations(destinations) {
    this._destinations = destinations.slice();
  }

  get destinations() {
    return this._destinations;
  }
}

export default Destinations;
