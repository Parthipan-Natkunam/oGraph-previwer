import { COPY_BTN_ID, TABS_ID } from "./modules/constants";
import { copyData, switchTab } from "./modules/eventHandlers";
import data from "./modules/state";
import { getOgParserCodeString } from "./modules/utils";
import renderViews from "./modules/viewRenderers";

document.getElementById(TABS_ID).addEventListener("click", switchTab);
document.getElementById(COPY_BTN_ID).addEventListener("click", copyData);

chrome.tabs.executeScript(null, { code: getOgParserCodeString() }, (result) => {
  const ogData = result?.[0] ?? {};
  data.setData(ogData);
  renderViews();
});
