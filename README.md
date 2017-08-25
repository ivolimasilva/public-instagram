# Public Instagram

[![unit test](https://img.shields.io/badge/test-passed-brightgreen.svg)]()

Tool to fetch Instagram's public content.

## Features

- Fetch any pubic posts (images only)
- Search for hashtags and get information
- Fetch recent posts by hashtag
- Search for user's (public) information
- Fetch posts by (public) user

## Installing

Using npm (& git):

```
npm install https://github.com/ivolimasilva/public-instagram.git
```

## Examples

```
var instagram = require('public-instagram');

// Async function in order to use await
async function example() {

    // Get information about hashtag
    var info = await instagram.tags.info('instagram');
    console.log(info);

    // Get recent posts that contain an hashtag
    const posts = await instagram.tags.recent('instagram', 1000);
    console.log(posts.length);

    // Search hashtags by a string field
    const hashtags = await instagram.tags.search('instagram');
    console.log(hashtags);

    // Get media by shortcode
    const post = await instagram.media.get('BP-rXUGBPJa');
    console.log(post);

    // Get information about a public user
    const user = await instagram.users.info('instagram');
    console.log(user);

    // Get posts from a public user
    const posts = await instagram.users.posts('instagram');
    console.log(posts.length);

};

example();
```

## Async/Await

`public-instagram` uses Async/Await. In order to use it as intended, you need atleast `Node v7.6`.

## Resources

* [API](https://github.com/ivolimasilva/public-instagram/wiki/API)

## License

GPL-3.0