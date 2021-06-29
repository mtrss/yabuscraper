# Yabu Scraper
Module with functions to scrape content from animeyabu.com, made with to study regular expressions.
- Only uses `node-fetch` and regexps to scrape content.
### Simple example of usage
```js
import { search } from "yabu-scrapper";


search("Naruto")
    .then(console.log)
    .catch(console.err)
```
### Installation
- With npm `npm install yabu-scraper`
- Wtih yarn `yarn add yabu-scraper`

### To-do
- [ ] Implement typings with TypeScript
- [ ] Write a function to allow more advanced searchs (filter by tags, number of episodes, etc)
- [ ] Write a better documentation