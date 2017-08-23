var instagram = require('./index');

async function go() {

    // var info = await instagram.tags.info('instagram');
    // console.log(info);

    // const posts = await instagram.tags.recent('instagram', 1000);
    // console.log(posts.length);

    // const hashtags = await instagram.tags.search('instagram');
    // console.log(hashtags);

    // const post = await instagram.media.get('BP-rXUGBPJa');
    // console.log(post);

    const user = await instagram.users.info('instagram');
    console.log(user);

};

go();