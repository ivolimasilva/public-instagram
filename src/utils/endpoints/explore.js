import 'isomorphic-fetch';
import yuri from 'yuri';

export default async (hashtag) => {
    const url = yuri
    .protocol('https')
    .hostname('instagram.com')
    .pathname(`explore/tags/${hashtag}`)
    .query({
        __a: 1,
    })
    .format();
    const response = await fetch(url);

    return (await response.json()).graphql.hashtag;
};
