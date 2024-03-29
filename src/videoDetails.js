/**
 * Extrai informações relacionadas a vídeos na plataforma
 * @function videoDetails
 * @param {string} url Pode ser a url do vídeo ou o id do vídeo.
 * @returns {Promise<Details>}
 */

import fetch from "node-fetch";
import {
  idValidate,
  videoObjExtract,
  imageExtract,
  videoSDExtract,
  videoHDExtract,
  urlValidate,
} from "./rexpressions.js";

/**
 * @typedef Details
 * @property {string} imageUrl A imagem da thumbnail do vídeo
 * @property {string} hd O link para o vídeo em resolução HD
 * @property {string} sd O link para o vídeo em resolução SD
 */

/**
 * Extraí os dados do vídeo de uma página do animesyabu.
 * @param {string} url Pode ser a url do vídeo ou o id do vídeo.
 * @returns {Promise<Details>}
 */
export default async function videoDetails(url) {
  const result = {};
  if (!urlValidate.test(url)) {
    if (idValidate.test(url)) {
      const videoId = idValidate.exec(url)[0];
      url = `https://animeyabu.com/play/${videoId}/`;
    } else {
      throw new TypeError("Invalid video url");
    }
  }

  const webData = await fetch(url);
  if (webData.url !== url) {
    return null;
  }

  const rawText = await webData.text();

  const exctractedObj = videoObjExtract.exec(rawText)[0];

  if (exctractedObj.includes("image")) {
    result.imageUrl = imageExtract.exec(exctractedObj)[0];
  }
  if (exctractedObj.includes("SD")) {
    result.sd = videoSDExtract.exec(exctractedObj)[0];
  }
  if (exctractedObj.includes("HD")) {
    result.hd = videoHDExtract.exec(exctractedObj)[0];
  }

  return result;
}
