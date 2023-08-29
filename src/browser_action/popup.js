import { COPY_BTN_ID, TABS_ID } from "./modules/constants";
import { copyData, switchTab } from "./modules/eventHandlers";
import data from "./modules/state";
import { parseOGData, getCurrentTab } from "./modules/utils";
import renderViews from "./modules/viewRenderers";

document.getElementById(TABS_ID).addEventListener("click", switchTab);
document.getElementById(COPY_BTN_ID).addEventListener("click", copyData);

getCurrentTab().then((tab) => {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: parseOGData,
    })
    .then((injectedResult) => {
      const ogData = injectedResult?.[0]?.result ?? {};
      data.setData(ogData);
      renderViews();
    });
});
