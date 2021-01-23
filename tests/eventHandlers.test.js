import {
  COPY_FAILED,
  COPY_SUCCESSFUL,
  DISPLAY_BLOCK,
  DISPLAY_NONE,
  ERROR,
  NOTIFY_CRITICAL,
  NOTIFY_SUCCESS,
} from "../src/browser_action/modules/constants";
import {
  autoDismissToast,
  hideToast,
  isButton,
  showToast,
} from "../src/browser_action/modules/eventHandlers";

const getMockDOM = () => {
  return {
    classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() },
    innerHTML: "",
    style: { display: "" },
  };
};

describe("Application event handlers: isButton helper method", () => {
  const buttonObject = { tagName: "BUTTON" };
  const listObject = { tagName: "LI" };
  test("returns true if the element is a button", () => {
    expect(isButton(buttonObject)).toBe(true);
  });
  test("returns false if the element is not a button", () => {
    expect(isButton(listObject)).toBe(false);
  });
  test("returns false if passed parameter is invalid", () => {
    expect(isButton({})).toBe(false);
    expect(isButton(null)).toBe(false);
    expect(isButton(undefined)).toBe(false);
    expect(isButton("")).toBe(false);
    expect(isButton(1)).toBe(false);
  });
});

describe("Application event handlers: showToast helper method", () => {
  let mockToastElement;
  beforeEach(() => {
    mockToastElement = getMockDOM();
  });

  test("displays a success toast with the success message", () => {
    expect(mockToastElement.style.display).toEqual("");
    showToast({
      toastElement: mockToastElement,
      type: NOTIFY_SUCCESS,
      message: COPY_SUCCESSFUL,
    });
    expect(mockToastElement.style.display).toEqual(DISPLAY_BLOCK);
    expect(mockToastElement.classList.remove).toBeCalledTimes(1);
    expect(mockToastElement.innerHTML).toEqual(COPY_SUCCESSFUL);
  });

  test("displays a error toast with the error message", () => {
    expect(mockToastElement.style.display).toEqual("");
    showToast({
      toastElement: mockToastElement,
      type: NOTIFY_CRITICAL,
      message: COPY_FAILED,
    });
    expect(mockToastElement.style.display).toEqual(DISPLAY_BLOCK);
    expect(mockToastElement.classList.add).toBeCalledTimes(1);
    expect(mockToastElement.classList.add).toBeCalledWith(ERROR);
    expect(mockToastElement.innerHTML).toEqual(COPY_FAILED);
  });
});

describe("Application event handlers: autoDismissToast helper method", () => {
  let mockToastElement;
  beforeEach(() => {
    mockToastElement = getMockDOM();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("wait for 3 seconds by default before dismissing the toast", () => {
    autoDismissToast(mockToastElement);
    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  });
  test("wait for custom time before dismissing the toast", () => {
    autoDismissToast(mockToastElement, 500);
    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
    autoDismissToast(mockToastElement, 8000);
    expect(setTimeout).toBeCalledTimes(2);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 8000);
  });
});

describe("Application event handlers: hideToast helper method", () => {
  let mockToastElement;
  beforeEach(() => {
    mockToastElement = getMockDOM();
  });

  test("hides the toast notification", () => {
    expect(mockToastElement.style.display).toEqual("");
    hideToast(mockToastElement);
    expect(mockToastElement.style.display).toEqual(DISPLAY_NONE);
    expect(mockToastElement.classList.remove).toBeCalledTimes(1);
    expect(mockToastElement.classList.remove).toBeCalledWith(ERROR);
    expect(mockToastElement.innerHTML).toEqual("");
  });
});
