import fetch from "node-fetch";
import { searchResult, searchVideoInfo, customTag , videoTags } from "./rexpressions.js";

/**
 * Procura por animes na plataforma
 * @param {string} animeName O nome do anime a ser pesquisado
 * @param {boolean} disableWarn Desativa o aviso relacionado ao tamanho do objeto
 * @returns {Promise<{title: string, tags: string[], thumbnail: string, url: string}[]>}
 */
export default async function searchAnime(animeName = "") {
  try {
    const searchResults = [];
    const searchUrl = `https://animeyabu.com/?s=${animeName.trim()}`;
    const websiteData = await fetch(searchUrl).then((r) => r.text());

    const videoListHTML = searchResult.exec(websiteData);
    if (!videoListHTML || !videoListHTML.length) {
      return result;
    }

    let videosData;
    while ((videosData = searchVideoInfo.exec(websiteData)) !== null) {
      const result = videosData[0];
      if (result) {
        const title = customTag("title").exec(result)[0];
        const thumbUrl = customTag("src").exec(result)[0];
        const animeUrl = customTag("ref").exec(result)[0];
        const tags = videoTags.exec(result)[0];
        searchResults.push({
            title,
            tags: tags.split(", "),
            thumbnail: thumbUrl,
            url: animeUrl
        })
      }
    }

    return searchResults;
  } catch (error) {
    console.log(error);
  }
}