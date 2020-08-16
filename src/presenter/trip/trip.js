import NoEvents from '~/view/no-events/no-events';

class Trip {
  constructor(boardContainerNode) {
    this._boardContainerNode = boardContainerNode;

    this._noEvents = new NoEvents();
  }
}

export default Trip;
