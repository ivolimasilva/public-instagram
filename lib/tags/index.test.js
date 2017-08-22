var
    Chai = require('chai'),
    Expect = require('chai').expect,
    Instagram = require('../../index');

Chai.use(require('chai-json-schema'));

describe('Tags', () => {

    describe('Info(_hashtag)', () => {
        it('Should return hashtag\'s information (name and media count);', async () => {
            var info = await Instagram.tags.info('hpow');
            Expect(info).to.be.jsonSchema({
                type: 'object',
                required: ['name', 'count'],
                properties: {
                    name: {
                        type: 'string'
                    },
                    count: {
                        type: 'number'
                    }
                }
            });
        });
    });

    describe('Recent(_hashtag, _limit)', () => {
        it('Should return \'_limit\' number of posts that contain \'_hashtag\';', async () => {
            var posts = await Instagram.tags.recent('hpow', 1000);
            Expect(posts).to.have.lengthOf(1000);
        });
    });

});