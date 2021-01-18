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
