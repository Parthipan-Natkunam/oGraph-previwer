import { COPY_BTN_ID, TABS_ID } from "./modules/constants";
import { copyData, switchTab } from "./modules/eventHandlers";
import data from "./modules/state";
import { parseOGData, getCurrentTab } from "./modules/utils";
import renderViews from "./modules/viewRenderers";

document.getElementById(TABS_ID).addEventListener("click", switchTab);
document.getElementById(COPY_BTN_ID).addEventListener("click", copyData);

getCurrentTab().then((tab) => {
  let ogData = null;
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: parseOGData,
    })
    .then((injectedResult) => {
      ogData = injectedResult?.[0]?.result ?? {};
    }).catch(() => {
      ogData = {};
    }).finally(() => {
      data.setData(ogData);
      renderViews();
    });
});
