/**
 * Extraí informações sobre o anime (título, quantidade de episódios, etc)
 * @function grabDetails
 * @param {string} url O url para a página do anime
 * @param {boolean} grabInfo Se deverá ou não pegar as informações básicas (título, status e descrição)
 * @param {boolean} grabVideos Se deverá ou não pegar a lista de episódios
 * @returns {Promise<AnimeDetails>}
 */

/**
 * @typedef AnimeDetails
 * @property {string} title O título do anime
 * @property {Array<BasicEpisodeInfo>} episodes
 * @property {string} status O estado de publicação do anime
 * @property {string} description A descrição/sinopse do anime.
 */

/**
 * @typedef BasicEpisodeInfo
 * @property {string} title O título do episódio
 * @property {string} url A url para acessar o episódio
 * @property {string} thumbnailUrl
 */

 import fetch from "node-fetch";
 import {
   animeUrl,
   customTag,
   videoDetails,
   animeType,
   animeStatus,
   animeSinopse,
   animeVideos,
   animeVideo,
 } from "./rexpressions.js";
 
 const grabBasicInfo = (text) => {
   try {
     const animeInformationData = videoDetails.exec(text);
 
     if (!animeInformationData || !animeInformationData.length) {
       throw new Error("Could not find data, maybe the page layout has changed");
     }
     const rawData = animeInformationData[0];
     const title = customTag("data-name").exec(rawData)[0];
     const thumbnailUrl = customTag("src").exec(rawData)[0];
     const status = animeStatus.exec(rawData)[0];
     const type = animeType.exec(rawData)[0];
     const description = animeSinopse.exec(rawData)[0];
     return { title, thumbnailUrl, status, type, description };
   } catch (_) {
     throw new Error("Could not find data, maybe the page layout has changed");
   }
 };
 
 const getEpisodes = (text) => {
   try {
     const animeEpisodes = animeVideos.exec(text)[0];
     if (!animeEpisodes || !animeEpisodes.length) {
       throw new Error("Could not find data, maybe the page layout has changed");
     }
 
     const videos = [];
     let found;
     while ((found = animeVideo.exec(animeEpisodes)) !== null) {
       const result = found[0];
       const title = customTag("title").exec(result)[0];
       const url = customTag("href").exec(result)[0];
       const thumbnailUrl = customTag("src").exec(result)[0];
       videos.push({
         title,
         url,
         thumbnailUrl,
       });
     }
 
     return videos;
   } catch (_) {
     throw new Error("Could not find data, maybe the page layout has changed");
   }
 };
 
 export default async function grabDetails(
   url,
   grabInfo = true,
   grabEpisodes = false
 ) {
   if (!grabInfo && !grabEpisodes) {
     throw new TypeError("You can't grab nothing");
   }
 
   const result = {};
   if (!url || (typeof url !== "string") | !animeUrl.test(url)) {
     throw new TypeError("Invalid anime url");
   }
   const websiteData = await fetch(url);
   if (websiteData.url !== url) {
     return result;
   }
   const rawData = await websiteData.text();
   if (grabInfo) {
     Object.assign(result, grabBasicInfo(rawData));
   }
   if (grabEpisodes) {
     Object.assign(result, { episodes: getEpisodes(rawData) });
   }
 
   return result;
 }
 