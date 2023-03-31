export default class EventManager {
  constructor() {
    this.listners = new Map();
  }

  on(event, listner) {
    if (!this.listners.has(event)) {
      this.listners.set(event, []);
    }

    this.listners.get(event).push(listner);
  }

  emit(event, payload) {
    if (!this.listners.has(event)) {
      return;
    }
    this.listners.get(event).forEach((listner) => {
      listner(payload);
    });
  }

  removeListner(event, listnerToRemove) {
    const listners = this.listners.get(event);

    if (!listners) {
      return;
    }

    const filteredListeners = listners.filter(
      (listner) => listner !== listnerToRemove,
    );

    this.listners.set(event, filteredListeners);
  }
}
