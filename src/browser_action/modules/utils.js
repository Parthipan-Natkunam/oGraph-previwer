export function getImageWidth(imageUrl) {
  return new Promise(function (resolve, reject) {
    if (!imageUrl) {
      reject();
    }
    const img = new Image();
    img.onload = function () {
      resolve(this.width);
    };
    img.onerror = function () {
      reject();
    };
    img.src = imageUrl;
  });
}

export function getOgParserCodeString() {
  return `(function(){
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
}
