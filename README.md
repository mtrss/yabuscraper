# ❗ Desatualizado/Abandonado
**O código e as dependências desse projeto não são verificadas há meses, e o projeto provavelmente deixou de funcionar com a atualização do layout do AnimeYabu, decidi mantê-lo como read-only para fins de verificação ou para caso alguém queira utizar alguma parte do código.**

## Yabu Scraper
> **⚠️ Esse é um módulo ECMAScript! Não é possível utiiza-lo em projetos CommonJS. Para mais informações, acesse a [documentação do node.js](https://nodejs.org/api/esm.html)**
---
Simples biblioteca com funções para extrair informações dados do animeyabu, desenvolvi esse projeto no meu tempo livre para treinar expressões regulares. <br />
![npm](https://img.shields.io/npm/dt/yabu-scraper?style=for-the-badge)

### Exemplo de impementação
```js
import { search } from "yabu-scraper"

// Irá pesquisar Naruto e mostrar o título de todos os resultados.
async function printEveryTitle() {
    try {
        const results = await search("Naruto");
        for (const result of results) {
            console.log(result.title);
        }
    } catch (err) {
        console.log(err);
    }
}

printEveryTitle();
```
### Instalação
- Utilizando npm `npm install yabu-scraper`
- Uitilizando o melhor gerenciador de pacotes `yarn add yabu-scraper`

### Planos
- [ ] Implementar uma tipagem melhor com TypeScript
- [ ] Implementar uma função de busca melhor, que permite a filtragem de resultados pelas opções do site.
- [x] ~~Implementar uma função para obter os episódios de um anime.~~ 
----
Feito com :heart:, expressões regulares e JavaScript
