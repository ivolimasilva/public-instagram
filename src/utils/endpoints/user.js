import 'isomorphic-fetch';
import cheerio from 'cheerio';
import yuri from 'yuri';

// const validJSON = (input) => {
//     if (typeof input !== 'string') {
//         return false;
//     }
//     try {
//         JSON.parse(input);

//         return true;
//     } catch (error) {
//         return false;
//     }
// };

const user = async (username) => {
    const url = yuri
    .protocol('https')
    .hostname('instagram.com')
    .pathname(username)
    .format();
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const script = $('script')[2].children[0].data.split(' = ').pop();
    const json = script.substring(0, script.length - 1);

    console.log(JSON.parse(json).entry_data.ProfilePage[0].graphql.user);
};

(async () => { await user('beyonce'); })();
