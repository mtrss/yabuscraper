export const urlValidate = /https:\/\/animeyabu\.com\/play\/(\d+)\/$/;
export const idValidate = /^(\d+)$/;
export const videoObjExtract = /(?<=playlist:\[{)(.*)(?=}])/is;
export const imageExtract = /(?<=image: ")(.*)(?=")/;
export const videoSDExtract = /(?<=label: "HD", file: ").+?(?=")/;
export const videoHDExtract = /(?<=label: "SD", file: ").+?(?=")/;
export const latestUpdated =
  /(?<=<div class="loop-content phpvibe-video-list miau">).+?(?=<h3 class="loop-heading">)/;
export const videoThumb = /(?<=<div class="video-thumb( )?">).+?(?=<\/div>)/g;
export const videoThumbInfo = /(?<=<a).+?(?=\/><span class="vertical-align">)/g;
export const customTag = (param) => new RegExp(`(?<=${param}=").+?(?=")`);