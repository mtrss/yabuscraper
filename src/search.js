/**
 * Extrai informaçõe relacionadas a pesquisas na plataforma
 * @function search
 * @param {string} animeName O nome do anime a ser pesquisado
 * @returns {Promise<Array<SearchResult>>}
 */

import fetch from "node-fetch";
import { searchResult, searchVideoInfo, customTag , videoTags } from "./rexpressions.js";

/**
 * @typedef SearchResult
 * @property {string} title O título do anime
 * @property {string[]} tags As categorias da qual ele pertence
 * @property {string} url O link para a página do anime
 * @property {string} thumbnail Url para a imagem do anime
 */

/**
 * Efetua a pesquisa de um anime
 * @param {string} animeName O nome do anime
 * @returns {Promise<Array<SearchResult>>} O resultado da pesquisa
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
    console.error(error);
    throw error;
  }
}