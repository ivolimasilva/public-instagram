const Instagram = require('.');
const utils = require('./lib/utils');
const defaults = require('./lib/defaults');

(async () => {
    const posts = await Instagram.users.posts('ivolimasilva.photography');
    console.log(posts);
})();