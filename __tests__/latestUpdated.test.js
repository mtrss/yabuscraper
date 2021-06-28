import { test, expect } from "@jest/globals";
import latestUpdated from "../src/latestUpdated";

const desiredResult = {
    title: /Episódio/,
    thumbnail: /^https?:\/\/\animeyabu\.com\/capas\/.+\.(png|jpg)$/,
    link: /^https?:\/\/animeyabu\.com\/play\/\d+\/$/
}

test("Should return a array with 12 items", () => {
    return latestUpdated().then(result => {
        expect(result).toHaveLength(12);
    })
})

test("The title, thumbnail and link shoud be valid", () => {
    return latestUpdated().then(result => {
        result.forEach((animeInfo) => {
            expect(animeInfo).toMatchObject(desiredResult);
        })
    })
})
