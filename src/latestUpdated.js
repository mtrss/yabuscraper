/**
 * Extrai informaçõe sobre os últimos episódios adicionados a plataforma
 * @function getLatestUpdated
 * @returns {Promise<Array<UpdatedDetails>>}
 */

import fetch from "node-fetch";
import {
  latestUpdated,
  videoThumb,
  videoThumbInfo,
  customTag,
} from "./rexpressions.js";

const executeForResult = (rgx, value, func) => {
  const results = [];
  let found;
  while ((found = rgx.exec(value)) !== null) {
    const result = func(found[0]);
    if (result) {
      results.push(result);
    }
  }
  return results;
};

/**
 * @typedef UpdatedDetails
 * @property {string} title O título do episódio adicionado
 * @property {string} thumbnail O link para a thumbnail do episódio
 * @property {string} link O link para o episódio
 */

export default async function getLatestUpdated() {
  const result = [];

  const websiteData = await fetch("https://animeyabu.com/").then((result) =>
    result.text()
  );

  const extractedData = latestUpdated.exec(websiteData);

  if (!extractedData || !extractedData.length) {
    throw new Error(
      "Something went wrong while scraping content from the home page maybe the page layout has changed."
    );
  }

  const thumbsArr = executeForResult(
    videoThumb,
    extractedData[0],
    (matched) => {
      return videoThumbInfo.exec(matched);
    }
  );

  for (let i = 0; i < thumbsArr.length; i++) {
    const thumb = thumbsArr[i];
    const title = customTag("title").exec(thumb)[0];
    const thumbnail = `http://animeyabu.com/${customTag("src").exec(thumb)[0]}`;
    const link = customTag("href").exec(thumb)[0];
    result.push({
      title,
      thumbnail,
      link,
    });
  }
  return result;
}
