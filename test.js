var instagram = require('./index');

// Get recent
// instagram.search.hashtag.recent('hpow', 1000);
instagram.tags.info('hpow')
    .then((info) => {
        console.log(info);
    });

/*

const
    puppeteer = require('puppeteer'),
    URL = require('url');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterceptionEnabled(true);
    page.on('request', request => {
        if (request.url.startsWith('https://www.instagram.com/graphql/query/')) {
            console.log('Query ID:\t', request.url.split('=')[1].split('&')[0]);
        } else {
            request.continue();
        }
    });
    await page.goto('https://www.instagram.com/explore/tags/instagram/');

    // Click on 'more images'
    await page.click('._1cr2e._epyes');

    browser.close();

})();

*/