var
    Chai = require('chai'),
    Expect = require('chai').expect,
    Instagram = require('../../index');

Chai.use(require('chai-json-schema'));

describe('Tags', () => {

    describe('Info(_hashtag)', () => {
        it('Testing schema of return object', async () => {
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

        it('Testing type and length of return object', async () => {
            posts = await Instagram.tags.recent('hpow', 1000);
            Expect(posts).to.be.an('array');
            Expect(posts).to.have.lengthOf(1000);
        });

        it('Testing schema of return object', async () => {
            posts = await Instagram.tags.recent('hpow', 500);
            Expect(posts[0]).to.be.jsonSchema({
                type: 'object',
                required: [
                    'id',
                    'caption',
                    'shortcode',
                    'timestamp',
                    'image',
                    'likes',
                    'owner'
                ]
            });
        });
    });

});