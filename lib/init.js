'use strict';

const
    puppeteer = require('puppeteer');

var
    defaults = require('./defaults');

exports = module.exports = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterceptionEnabled(true);
    page.on('request', (request) => {
        if (request.url.startsWith(defaults.INSTAGRAM_QUERY)) {
            console.log('Query ID:\t', request.url.split('=')[1].split('&')[0]);
            defaults.INSTAGRAM_GRAPHQL_QUERY_ID = request.url.split('=')[1].split('&')[0];
        } else {
            request.continue();
        }
    });
    await page.goto('https://www.instagram.com/explore/tags/' + defaults.INSTAGRAM_DEFAULT_HASHTAG);

    // Click on 'more images'
    await page.click('._1cr2e._epyes');

    browser.close();
}