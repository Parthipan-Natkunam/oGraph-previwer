export function getImageWidth(imageUrl) {
  return new Promise(function (resolve, reject) {
    if (!imageUrl || !imageUrl?.trim()?.length) {
      reject();
    }
    const img = new Image();
    img.onload = function () {
      resolve({ width: this.naturalWidth, height: this.naturalHeight });
    };
    img.onerror = function () {
      reject();
    };
    img.src = imageUrl;
  });
}

export function parseOGData() {
  const ogData = {};
  const ogTags = document.querySelectorAll('meta[property^="og:"]');
  ogTags.forEach((tag) => {
    const key = tag.getAttribute("property").substr(3);
    const value = tag.getAttribute("content");
    if (key) {
      ogData[key] = value;
    }
  });
  return ogData;
}

export async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
