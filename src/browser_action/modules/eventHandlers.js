import {
  ACTIVE,
  ACTIVE_TAB_BUTTON_CLASS,
  CONTENT_BOX_ACTIVE_CLASS,
  COPY_FAILED,
  COPY_SUCCESSFUL,
  DISPLAY_BLOCK,
  DISPLAY_NONE,
  ERROR,
  NOTIFY_CRITICAL,
  NOTIFY_SUCCESS,
  TOAST_ID,
} from "./constants";
import data from "./state";

const isButton = (element) => element?.tagName === "BUTTON" || false;

const autoDismissToast = (toastElement, timeout = 3000) => {
  const toastTimeoutId = setTimeout(() => {
    toastElement.style.display = DISPLAY_NONE;
    toastElement.classList.remove(ERROR);
    toastElement.innerHTML = "";
    clearTimeout(toastTimeoutId);
  }, timeout);
};

const showToast = ({ toastElement, type, message }) => {
  switch (type) {
    case NOTIFY_CRITICAL: {
      toastElement.classList.add(ERROR);
    }
    default: {
      toastElement.classList.remove(ERROR);
    }
  }
  toastElement.innerHTML = message;
  toastElement.style.display = DISPLAY_BLOCK;
};

export const switchTab = (event) => {
  if (event?.target) {
    if (!isButton(event.target)) {
      return;
    }
    const tabToSwitch = event?.target?.dataset?.tab;
    if (tabToSwitch) {
      document.querySelector(ACTIVE_TAB_BUTTON_CLASS).classList.remove(ACTIVE);
      document.querySelector(CONTENT_BOX_ACTIVE_CLASS).classList.remove(ACTIVE);
      event.target.classList.add(ACTIVE);
      document.getElementById(tabToSwitch).classList.add(ACTIVE);
    }
  }
};

export const copyData = () => {
  const toastConatiner = document.getElementById(TOAST_ID);
  let isCopySuccessful = false;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(data.getData()));
    isCopySuccessful = true;
  }
  showToast({
    toastElement: toastConatiner,
    type: isCopySuccessful ? NOTIFY_SUCCESS : NOTIFY_CRITICAL,
    message: isCopySuccessful ? COPY_SUCCESSFUL : COPY_FAILED,
  });
  autoDismissToast(toastConatiner);
};
