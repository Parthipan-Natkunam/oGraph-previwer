class State {
  #data = {};
  getData() {
    return this.#data;
  }

  setData(data) {
    this.#data = data;
  }
}

export default new State();
