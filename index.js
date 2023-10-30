const express = require('express');
const playwright = require('playwright')
const app = express();
let url = 'https://9animetv.to/tv';
let url2 = 'https://9animetv.to/search?keyword='

// http://localhost:8080/GetAllAnime
app.get('/GetAllAnime', async function (req, res) {
    const browser = await playwright.chromium.launch({
        headless: true
    })
    
    const page = await browser.newPage();
    await page.goto(url)
    const anime = await page.$eval('.film_list-grid', headerElm => {
        const data = []
        const animeList = headerElm.querySelectorAll('.flw-item.item-qtip');
        Array.from(animeList).forEach(ele => {
            let title = ele.querySelector('div.film-detail > .film-name').textContent;
            let link = ele.querySelector('div.film-detail > .film-name > a').getAttribute('href');
            let image = ele.querySelector('img.film-poster-img').getAttribute('data-src')
            data.push({
                title: title,
                link: link,
                image: image
            })
        })
        return data;
    })
    res.json(anime)
})

// http://localhost:8080/GetAnimeSearch?keyword=hori
//https://9animetv.to/search?keyword=hori
app.get('/GetAnimeSearch', async function (req, res) {
    const browser = await playwright.chromium.launch({
        headless: true
    })
    const keyword = req.query.keyword;
    const page = await browser.newPage();
    await page.goto(url2 + keyword)
    const anime = await page.$eval('.film_list-grid', headerElm => {
        const data = []
        const animeList = headerElm.querySelectorAll('.flw-item.item-qtip');
        Array.from(animeList).forEach(ele => {
            let title = ele.querySelector('div.film-detail > .film-name').textContent;
            let link = ele.querySelector('div.film-detail > .film-name > a').getAttribute('href');
            let image = ele.querySelector('img.film-poster-img').getAttribute('data-src')
            data.push({
                title: title,
                link: link,
                image: image
            })
        })
        return data;
    })
    res.json(anime)
})

app.listen('8080');
console.log('API is listening');

module.exports = app