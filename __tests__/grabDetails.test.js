import { test, expect } from "@jest/globals";
import grabDetails from "../src/grabDetails";

test("When passing a valid url, the title, episodes size, type and description should be valid.", () => {
    return grabDetails("https://animeyabu.com/anime/artiswitch/").then(result => {
        expect(result).toBeTruthy();
        expect(result.title).toBeTruthy();
        expect(result.type).toBeTruthy();
        expect(result.status).toBeTruthy();
    })
})

test("When passiv a valid url it should return valid episodes", () => {
    return grabDetails("https://animeyabu.com/anime/artiswitch/", true, true).then(result => {
        expect(result).toBeTruthy();
        expect(result.episodes).not.toHaveLength(0);
        result.episodes.forEach((episode) => {
            expect(episode.title).toMatch(/Episódio/);
            expect(episode.thumbnailUrl).toMatch(/^https?:\/\/\animeyabu\.com\/capas\/.+\.(png|jpg)$/);
            expect(episode.url).toMatch(/^https?:\/\/animeyabu\.com\/play\/\d+\/$/);
        })
    })
})

