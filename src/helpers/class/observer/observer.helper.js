class Observer {
  constructor() {
    this._observers = [];
  }

  notify(event, payload) {
    this.observers.forEach((observer) => observer(event, payload));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((existedObserver) => existedObserver !== observer);
  }
}

export default Observer;
