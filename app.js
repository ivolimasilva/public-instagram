var instagram = require('./index');

async function go() {
    var info = await instagram.tags.info('hpow');
    console.log(info);

    const posts = await instagram.tags.recent('hpow', 1000);
    console.log(posts.length);
};

go();