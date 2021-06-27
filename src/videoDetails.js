import fetch from "node-fetch";

const urlValidate = /https:\/\/animeyabu\.com\/play\/(\d+)\/$/;
const idValidate  = /^(\d+)$/;
const videoObjExtract = /(?<=playlist:\[{)(.*)(?=}])/is;
const imageExtract = /(?<=image: ")(.*)(?=")/;
const videoSDExtract = /(?<=label: "HD", file: ").+?(?=")/;
const videoHDExtract = /(?<=label: "SD", file: ").+?(?=")/;

/**
 * Extraí os dados do vídeo de uma página do animesyabu.
 * @param {string} url Pode ser a url do vídeo ou o id do vídeo.
 * @returns {{imageUrl?: string, hd?: string, sd?: string}}
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

        const webData = await fetch(url);

        const exctractedObj = videoObjExtract.exec(webData)[0];
        
        if (exctractedObj.includes("image")) {
            result.imageUrl = imageExtract.exec(exctractedObj)[0];
        }
        if (exctractedObj.includes("SD")) {
            result.videoSD = videoSDExtract.exec(exctractedObj)[0];
        }
        if (exctractedObj.includes("HD")) {
            result.videoHD = videoHDExtract.exec(exctractedObj)[0];
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}