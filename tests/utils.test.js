import {
  getImageWidth,
  getOgParserCodeString,
} from "../src/browser_action/modules/utils";

describe("Application Utility Method: getOgParserCodeString", () => {
  const mockIIFECodeString = `(function(){
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
  test("returns the stringified IIFE", () => {
    expect(getOgParserCodeString()).toEqual(mockIIFECodeString);
  });
});
