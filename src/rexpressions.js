export const urlValidate = /https:\/\/animeyabu\.com\/play\/(\d+)\/$/;
export const idValidate = /^(\d+)$/;
export const videoObjExtract = /(?<=playlist:\[{)(.*)(?=}])/is;
export const animeUrl = /^https?:\/\/animeyabu\.com\/anime\/.+\/$/;
export const imageExtract = /(?<=image: ")(.*)(?=")/;
export const videoSDExtract = /(?<=label: "HD", file: ").+?(?=")/;
export const videoHDExtract = /(?<=label: "SD", file: ").+?(?=")/;
export const latestUpdated =
  /(?<=<div class="loop-content phpvibe-video-list miau">).+?(?=<h3 class="loop-heading">)/;
export const searchResult =
  /(?<=<div class="loop-content phpvibe-video-list miau">).*?(?=<script)/;
export const searchVideoInfo = /(?<=<div id="video-\d+" class="video">).*?(?=<\/li><li><\/li><\/ul>)/g;
export const videoThumb = /(?<=<div class="video-thumb( )?">).+?(?=<\/div>)/g;
export const videoThumbInfo = /(?<=<a).+?(?=\/><span class="vertical-align">)/g;
export const videoTags = /(?<=<li>).+?(?=\.)/;
export const videoDetails = /(?<=<div class="row">).+?(?=<div class="playlist-head")/;
export const animeType = /(?<=Tipo: ).+?(?=<br>)/
export const animeStatus = /(?<=Status: ).+?(?=<br>)/;
export const animeSinopse = /(?<= 70px;"><p>).+?(?=<\/p><\/p><)/;
export const animeVideos = /(?<=<div class="loop-content phpvibe-video-list miau">).+?(?=\.naco)/;
export const animeVideo = /(?<=<div id="video-\d+" class="video">).+?(?=class="timer">24:00)/g;
export const customDetail = (start, end) => new RegExp(`(?<=${start}).+?(?=${end})`);
export const customTag = (param) => new RegExp(`(?<=${param}=").+?(?=")`);
