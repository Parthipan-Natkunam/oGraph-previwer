import {
  CODE_CONTAINER_ID,
  PREVIEW_CONTAINER_ID,
  PREVIEW_UI,
} from "./constants";
import data from "./state";
import { getImageWidth } from "./utils";

const getCodeTemplateString = () => {
  let templateString = "{<br/>";
  for (const [key, value] of Object.entries(data.getData())) {
    templateString += `<span class="key">${key}</span>: <span class="value">${value}</span></br>`;
  }
  templateString += "}";
  return templateString;
};

const getPreviewTemplateString = (
  previewType,
  { title, description, imageSrc, site_name, url, imgWidth }
) => {
  let templateString = "";

  const imageDivDefaultStyle = "height:165px;";
  const imageContainerComputedStyle =
    previewType === PREVIEW_UI.WITH_IMAGE
      ? `style="${imageDivDefaultStyle}background: url('${imageSrc}') no-repeat top / ${
          imgWidth >= 362 ? "cover" : "contain"
        };"`
      : `style="${imageDivDefaultStyle}"`;

  templateString += `
    <div ${imageContainerComputedStyle}></div>
    <h2>${title}</h2>
    <p>
     ${description}
    </p>
    <h4>${site_name ? site_name : url}</h4>
  `;
  return templateString;
};

/*populate datatab UI*/
export function updateDataView() {
  if (Object.keys(data.getData()).length) {
    const dataUIContainer = document.getElementById(CODE_CONTAINER_ID);
    dataUIContainer.innerHTML = getCodeTemplateString();
  }
}

/*populate preview UI with data from chrome script execution*/
export function updatePreview() {
  if (Object.keys(data.getData()).length) {
    const previewContainer = document.getElementById(PREVIEW_CONTAINER_ID);
    const {
      title,
      image: imageSrc,
      description,
      site_name,
      url,
    } = data.getData();
    if (previewContainer) {
      let template;
      getImageWidth(imageSrc)
        .then((imgWidth) => {
          template = getPreviewTemplateString(PREVIEW_UI.WITH_IMAGE, {
            title,
            description,
            imageSrc,
            site_name,
            url,
            imgWidth,
          });
        })
        .catch(() => {
          template = getPreviewTemplateString(PREVIEW_UI.WITHOUT_IMAGE, {
            title,
            description,
            site_name,
            url,
          });
        })
        .finally(() => {
          previewContainer.innerHTML = template;
        });
    }
  }
}

export default function populateAllViews() {
  updatePreview();
  updateDataView();
}
