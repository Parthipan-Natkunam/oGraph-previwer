/* POpup UI Interaction */
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
    }
  }
};

document.getElementById("tabs").addEventListener("click", switchTab);

/*Image Utils*/
function getImageWidth(imageUrl) {
  return new Promise(function (resolve) {
    const img = new Image();
    img.onload = function () {
      resolve(this.width);
    };
    img.src = imageUrl;
  });
}

/*populate UI with data from chrome script execution*/
function updatePreview(ogData) {
  if (Object.keys(ogData).length) {
    const previewContainer = document.getElementById("preview-og-data");
    const { title, image: imageSrc, description, site_name, url } = ogData;
    if (previewContainer) {
      getImageWidth(imageSrc)
        .then((imgWidth) => {
          const templateString = `
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

          previewContainer.innerHTML = templateString;
        })
        .catch((err) => {
          console.error(err);
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
  updatePreview(ogData);
});
