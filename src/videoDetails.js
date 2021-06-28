import fetch from "node-fetch";
import {
    idValidate,
    videoObjExtract,
    imageExtract,
    videoSDExtract,
    videoHDExtract,
} from "./rexpressions";
/**
 * Extraí os dados do vídeo de uma página do animesyabu.
 * @param {string} url Pode ser a url do vídeo ou o id do vídeo.
 * @returns {Promise<{imageUrl?: string, hd?: string, sd?: string}>}
 */
export default async function videoDetails(url) {
    try {
        const result = {};
        if (!urlValidate.test(url)) {
            if (idValidate.test(url)) {
                const videoId = idValidate.exec(url)[0];
                url = `https://animeyabu.com/play/${videoId}/`;
            } else {
                throw new TypeError("Invalid video url");
            }
        }

        const webData = await fetch(url)
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
    } catch (error) {
        console.error(error);
        throw error;
    }
}