import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const regexs = {
  latestUpdated:
    /(?<=<div class="loop-content phpvibe-video-list miau">).+?(?=<h3 class="loop-heading">)/,
  videoThumb: /(?<=<div class="video-thumb( )?">).+?(?=<\/div>)/g,
  videoThumbInfo: /(?<=<a).+?(?=\/><span class="vertical-align">)/g,
  customTag: (param) => new RegExp(`(?<=${param}=").+?(?=")`),
};

/**
 * Para cada resultado da expressão regular, será chamada uma função passando o parâmetro com o valor encontrado e então retornará um array com o resultado de todas as chamadas.
 * @param {RegExp} rgx A expressão regular a ser usada
 * @param {string} value O valor a ser explorado pela expressão regular
 * @param {function} func A função que será chamada e deve retornar um string
 * @returns {string[]} Array com os resultados de cada chamada feita.
 */
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
 * Pega as informações sobre os últimos animes atualizados
 * @returns {Promise<{{title: string, thumbnail: string, link: string}}>}
 */
export default async function latestUpdated() {
  try {
    const result = [];

    const websiteData = await fetch("https://animeyabu.com/").then((result) =>
      result.text()
    );

    const extractedData = regexs.latestUpdated.exec(websiteData);

    if (!extractedData || !extractedData.length) {
      throw new Error(
        "Something went wrong while scraping content from the home page maybe the page layout has changed."
      );
    }

    const thumbsArr = executeForResult(
      regexs.videoThumb,
      extractedData[0],
      (matched) => {
        return regexs.videoThumbInfo.exec(matched);
      }
    );

    for (let i = 0; i < thumbsArr.length; i++) {
      const thumb = thumbsArr[i];
      const title = regexs.customTag("title").exec(thumb)[0];
      const thumbnail = `http://animeyabu.com/${regexs.customTag("src").exec(thumb)[0]}`;
      const link = regexs.customTag("href").exec(thumb)[0];
      result.push({
        title,
        thumbnail,
        link,
      });
    }

    return result;
  } catch (error) {
    console.log(error);
  }
}
