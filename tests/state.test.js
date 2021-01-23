import state from "../src/browser_action/modules/state";

const mockData = {
  name: "Test name",
  description: "descripotion for the test",
  site_name: "myAwesomeSite.com",
};

describe("Application state object", () => {
  test("loads initially with an empty object", () => {
    expect(state.getData()).toEqual({});
  });
  test("setData sets the passed object as the app state ", () => {
    state.setData(mockData);
    expect(state.getData()).toEqual(mockData);
  });
  test("the data property of the state shouldn't be accessible directly", () => {
    expect(state.data).toBeUndefined();
  });
});
