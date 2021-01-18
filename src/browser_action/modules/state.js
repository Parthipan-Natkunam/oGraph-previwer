class State {
  data = {};
  instance = null;

  constructor() {
    if (!this.instance) {
      this.instance = this;
    }
    return this;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}

export default State;
