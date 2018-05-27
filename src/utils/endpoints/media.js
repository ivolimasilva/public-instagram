import 'isomorphic-fetch';
import yuri from 'yuri';

export default async (shortcode) => {
    const url = yuri
    .protocol('https')
    .hostname('instagram.com')
    .pathname(`p/${shortcode}`)
    .query({
        __a: 1,
    })
    .format();
    const response = await fetch(url);

    return (await response.json()).graphql.shortcode_media;
};
