import {
  getImageWidth,
  getOgParserCodeString,
} from "../src/browser_action/modules/utils";

describe("Application Utility Method: getImageWidth", () => {
  test("rejects the promise, when iamgeURL is empty", () => {
    return getImageWidth().catch((error) => expect(error).toEqual(undefined));
  });
  test("rejects the promise, when iamgeURL is null", () => {
    return getImageWidth(null).catch((error) =>
      expect(error).toEqual(undefined)
    );
  });
  test("rejects the promise, when iamgeURL is undefined", () => {
    return getImageWidth(void 0).catch((error) =>
      expect(error).toEqual(undefined)
    );
  });
  test("rejects the promise, when iamgeURL is an empty string", () => {
    return getImageWidth("").catch((error) => expect(error).toEqual(undefined));
  });
  test("rejects the promise, when iamgeURL is a space only string", () => {
    return getImageWidth("   ").catch((error) =>
      expect(error).toEqual(undefined)
    );
  });
  test("rejects the promise, when imag load is errored", () => {
    global.Image = class {
      constructor() {
        setTimeout(() => this.onerror(), 300);
      }
    };

    return getImageWidth("nonexistentGibberish.png").catch((error) =>
      expect(error).toBe(undefined)
    );
  });
  test("resolves the width, when iamgeURL is loaded", () => {
    global.Image = class {
      constructor() {
        this.naturalWidth = 16;
        this.naturalHeight = 32;
        setTimeout(() => this.onload(), 300);
      }
    };

    return getImageWidth("../../icons/icon16.png").then((width) =>
      expect(width).toEqual({height: 32, width: 16})
    );
  });
});
