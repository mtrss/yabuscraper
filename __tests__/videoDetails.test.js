import { test, expect } from "@jest/globals";
import videoDetails from "../src/videoDetails";

const desiredAnime = {
    imageUrl: expect.stringMatching(/^(https?:\/\/.*\.(?:png|jpg))$/),
    hd: expect.stringContaining("r1---sn-apaapm4g-apae.googlevideo.com"),
    sd: expect.stringContaining("r1---sn-apaapm4g-apae.googlevideo.com"),
}

test("When passing a valid anime id should not return a empty object", () => {
    return videoDetails("148639").then(result => {
        expect(result).toMatchObject(desiredAnime);
    })
})

test("When passing a valid anime url should not return a empty object", () => {
    return videoDetails("https://animeyabu.com/play/148639/").then(result => {
        expect(result).toMatchObject(desiredAnime);
    })
})

test("When passing a invalid anime id should return null", () => {
    return videoDetails("https://animeyabu.com/play/123123123123123123/").then(result => {
        expect(result).toBe(null);
    })
})