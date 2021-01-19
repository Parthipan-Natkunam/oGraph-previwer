import { COPY_BTN_ID, TABS_ID } from "./modules/constants";
import { copyData, switchTab } from "./modules/eventHandlers";
import data from "./modules/state";
import { getImageWidth, getOgParserCodeString } from "./modules/utils";

/*Attach Event Listeners*/
document.getElementById(TABS_ID).addEventListener("click", switchTab);
document.getElementById(COPY_BTN_ID).addEventListener("click", copyData);

/*populate datatab UI*/
function updateDataView() {
  if (Object.keys(data.getData()).length) {
    const dataUIContainer = document.getElementById("codeui");
    let templateString = "{<br/>";
    for (const [key, value] of Object.entries(data.getData())) {
      templateString += `<span class="key">${key}</span>: <span class="value">${value}</span></br>`;
    }
    templateString += "}";

    dataUIContainer.innerHTML = templateString;
  }
}

/*populate preview UI with data from chrome script execution*/
function updatePreview() {
  if (Object.keys(data.getData()).length) {
    const previewContainer = document.getElementById("preview-og-data");
    const {
      title,
      image: imageSrc,
      description,
      site_name,
      url,
    } = data.getData();
    if (previewContainer) {
      let templateString = "";
      getImageWidth(imageSrc)
        .then((imgWidth) => {
          templateString += `
          <div
            style="height:165px;background: url('${imageSrc}') no-repeat top / ${
            imgWidth >= 362 ? "cover" : "contain"
          }"
          ></div>
          <h2>${title}</h2>
          <p>
           ${description}
          </p>
          <h4>${site_name ? site_name : url}</h4>
        `;
        })
        .catch((err) => {
          templateString += `
          <div
            style="height:165px;"
          ></div>
          <h2>${title}</h2>
          <p>
           ${description}
          </p>
          <h4>${site_name ? site_name : url}</h4>
        `;
        })
        .finally(() => {
          previewContainer.innerHTML = templateString;
        });
    }
  }
}

chrome.tabs.executeScript(null, { code: getOgParserCodeString() }, (result) => {
  const ogData = result?.[0] || {};
  data.setData(ogData);
  updatePreview();
  updateDataView();
});
