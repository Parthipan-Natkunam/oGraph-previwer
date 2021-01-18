import State from "./modules/state";

/*global State for the extension*/
let data = new State();

/* popup UI Interaction */
const switchTab = (event) => {
  if (event && event.target) {
    if (event.target.tagName !== "BUTTON") {
      return;
    }
    const tabToSwitch = event.target.dataset.tab;
    if (tabToSwitch) {
      document
        .querySelector(".popup__tab-btn.active")
        .classList.remove("active");
      document.querySelector(".content-box.active").classList.remove("active");
      event.target.classList.add("active");
      document.getElementById(tabToSwitch).classList.add("active");
      if (tabToSwitch === "data") {
        updateDataView();
      }
    }
  }
};

document.getElementById("tabs").addEventListener("click", switchTab);
document.getElementById("copy-btn").addEventListener("click", () => {
  const toastConatiner = document.getElementById("toast");
  if (navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(data.getData()));
    toastConatiner.innerHTML = "Data Copied to Clipboard.";
    toastConatiner.style.display = "block";
  } else {
    toastConatiner.innerHTML = "Feature not supported by your browser version";
    toastConatiner.classList.add("error");
    toastConatiner.style.display = "block";
  }
  toastTimeoutId = setTimeout(() => {
    toastConatiner.style.display = "none";
    toastConatiner.classList.remove("error");
    toastConatiner.innerHTML = "";
    clearTimeout(toastTimeoutId);
  }, 3000);
});

/*Image Utils*/
function getImageWidth(imageUrl) {
  return new Promise(function (resolve, reject) {
    if (!imageUrl) {
      reject();
    }
    const img = new Image();
    img.onload = function () {
      resolve(this.width);
    };
    img.src = imageUrl;
  });
}

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

/*Chrome Tab HTML Parse og tags*/
const ogParser = `(function(){
  const ogData = {};
  const ogTags = document.querySelectorAll('meta[property^="og:"]');
  ogTags.forEach(tag=>{
    const key = tag.getAttribute("property").substr(3);
    const value = tag.getAttribute("content");
    if(key){
      ogData[key] = value;
    }
  });
  return ogData;
})()`;

chrome.tabs.executeScript(null, { code: ogParser }, (result) => {
  const ogData = result ? result[0] : {};
  data.setData(ogData);
  updatePreview();
});
