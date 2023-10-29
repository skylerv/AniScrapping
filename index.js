const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
let url = 'https://9animetv.to/tv';
let url2 = 'https://9animetv.to/search?keyword='

// http://localhost:8080/GetAllAnime
app.get('/GetAllAnime', function(req, res) {
    let animeList = [];
    axios({
        method:'get',
        url: url
    }).then(resp => {
        const html = resp.data
        const $ = cheerio.load(html)
        let titles = $('.film-name');
        titles.each(function (i, ele) {
            let title = $(ele).find('div.film-detail > .film-name').text();
            let link = $(ele).find('div.film-detail > .film-name > a').attr('href');
            let image = $(ele).find('img.film-poster-img').attr('src');
            animeList.push({
                title: title,
                link: link,
                image: image
            })
        })
        res.json(animeList);
    })
})

// http://localhost:8080/GetAnimeSearch?keyword=hori
//https://9animetv.to/search?keyword=hori
app.get('/GetAnimeSearch', function (req, res) {
    const keyword = req.query.keyword;
    let animeList = [];
    axios({
        method: 'get',
        url: url2 + keyword
    }).then(resp => {
        const html = resp.data
        const $ = cheerio.load(html)
        let anime = $('div.flw-item.item-qtip');
        anime.each(function (i, ele) {
            let title = $(ele).find('div.film-detail > .film-name').text();
            let link = $(ele).find('div.film-detail > .film-name > a').attr('href');
            let image = $(ele).find('img.film-poster-img').attr('src');
            animeList.push({
                title: title,
                link: link,
                image: image
            })
        })
        res.json(animeList);
    })
})

app.get('/GetAnimeSearch', function (req, res) {
    const keyword = req.query.keyword;
    let animeList = [];
    axios({
        method: 'get',
        url: url2 + keyword
    }).then(resp => {
        const html = resp.data
        const $ = cheerio.load(html)
        let anime = $('div.flw-item.item-qtip');
        anime.each(function (i, ele) {
            let animeTitle = $(ele).find('div.film-detail > .film-name').text();
            let animeLink = $(ele).find('div.film-detail > .film-name > a').attr('href');
            let imageLink = $(ele).find('img.film-poster-img').attr('src');
            animeList.push({
                title: animeTitle,
                link: animeLink,
                image: imageLink
            })
        })
        console.log(animeList);
        res.json(animeList);
    })
})

app.listen('8080');
console.log('API is listening');

module.exports = app