import {
  CODE_CONTAINER_ID,
  NO_OG_DATA,
  PREVIEW_CONTAINER_ID,
  PREVIEW_UI,
  PREVIEW_IMG_HEIGHT,
} from "./constants";
import data from "./state";
import { getImageWidth} from "./utils";

const getNoPreviewTemplateString = () => {
  return `<h3 class="no-data">${NO_OG_DATA}</h3>`;
};

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
  { title, description, imageSrc, site_name, url, imgWidth, imgHeight }
) => {
  let templateString = "";

  const imageDivDefaultStyle = `height:${PREVIEW_IMG_HEIGHT}px;`;
  const imageContainerComputedStyle =
    previewType === PREVIEW_UI.WITH_IMAGE
      ? `style="${imageDivDefaultStyle}background: url('${imageSrc}') no-repeat top / contain;"`
      : `style="${imageDivDefaultStyle}"`;

  templateString += `
    <div ${imageContainerComputedStyle}></div>
    <h2>${title ?? ""}</h2>
    <p>
     ${description ?? ""}
    </p>
    <h4>${site_name ?? url ?? ""}</h4>
  `;
  return templateString;
};

/*populate datatab UI*/
export function updateDataView() {
  const dataUIContainer = document.getElementById(CODE_CONTAINER_ID);
  if (Object.keys(data.getData()).length) {
    dataUIContainer.innerHTML = getCodeTemplateString();
    return;
  }
  dataUIContainer.innerHTML = "{}";
}

/*populate preview UI with data from chrome script execution*/
export function updatePreview() {
  const previewContainer = document.getElementById(PREVIEW_CONTAINER_ID);
  if (Object.keys(data.getData()).length) {
    const {
      title,
      image: imageSrc,
      description,
      site_name,
      url,
    } = data.getData();
    let template;
    getImageWidth(imageSrc)
      .then(({ width, height }) => {
        console.log(width, height);
        template = getPreviewTemplateString(PREVIEW_UI.WITH_IMAGE, {
          title,
          description,
          imageSrc,
          site_name,
          url,
          imgWidth: width,
          imgHeight: height,
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
  } else {
    previewContainer.innerHTML = getNoPreviewTemplateString();
  }
}

export default function populateAllViews() {
  updatePreview();
  updateDataView();
}
