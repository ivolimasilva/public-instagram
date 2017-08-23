var instagram = require('./index');

async function go() {
    var info = await instagram.tags.info('hpow');
    console.log(info);

    // const posts = await instagram.tags.recent('hpow', 1000);
    // console.log(posts.length);

    const hashtags = await instagram.tags.search('canon');
    console.log(hashtags);

    const post = await instagram.media.get('BQYvbMmAgHz');
    console.log(post);
};

go();