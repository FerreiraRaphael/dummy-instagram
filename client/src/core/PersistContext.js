export class PersistContext {
  constructor(key, initialState) {
    this.key = key;
    const persistedState = this.getState();
    if (!persistedState) {
      this.persistState(initialState);
    }
  }

  persistState(state) {
    const stateJson = JSON.stringify(state);
    localStorage.setItem(this.key, stateJson);
  }

  getState() {
    try {
      const stateJson = localStorage.getItem(this.key);
      const parsedResult = JSON.parse(stateJson);
      return parsedResult;
    } catch (e) {
      return null;
    }
  }
}
