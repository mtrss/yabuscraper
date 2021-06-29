import { test, expect } from "@jest/globals";
import search from "../src/search";


test("Should no return an empty array for a valid search", () => {
    return search("naruto").then(result => {
        expect(result).not.toHaveLength(0);
    })
})

test("Should not return any undefined/null prop", () => {
    return search("naruto").then(result => {
        result.forEach((anime) => {
            expect(anime.tags).not.toHaveLength(0);
            expect(anime.url).toMatch(/^https?:\/\/animeyabu\.com\/anime\/.+\/$/);
            expect(anime.thumbnail).toMatch(/^https?:\/\/\animeyabu\.com\/capas\/.+\.(png|jpg)$/);
            expect(anime.title).toBeTruthy();
        })
    })
})