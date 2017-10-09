var
    Chai = require('chai'),
    Expect = require('chai').expect,
    Instagram = require('../../index');

Chai.use(require('chai-json-schema'));

describe('Tags', () => {

    describe('Info(_hashtag)', () => {
        it('Testing schema of return object', async () => {
            const info = await Instagram.tags.info('instagram');
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
            const posts = await Instagram.tags.recent('instagram', 500);
            Expect(posts).to.be.an('array');
            Expect(posts).to.have.lengthOf(500);
        });

        it('Testing schema of return object', async () => {
            const posts = await Instagram.tags.recent('instagram', 500);
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

    describe('Top(_hashtag)', () => {

        it('Testing type and length of return object', async () => {
            const posts = await Instagram.tags.top('hpow');
            Expect(posts).to.be.an('array');
            Expect(posts).to.have.lengthOf(9);
        });

        it('Testing schema of return object', async () => {
            const posts = await Instagram.tags.top('hpow');
            Expect(posts[0]).to.be.jsonSchema({
                type: 'object',
                required: [
                    'id',
                    'caption',
                    'shortcode',
                    'timestamp',
                    'image',
                    'dimensions'
                ]
            });
        });

    });

    describe('Search(_hashtag)', () => {

        it('Testing type of return object', async () => {
            const hashtags = await Instagram.tags.search('hpow');
            Expect(hashtags).to.be.an('array');
        });

        it('Testing schema of return object', async () => {
            const hashtags = await Instagram.tags.search('hpow');
            Expect(hashtags[0]).to.be.jsonSchema({
                type: 'object',
                required: [
                    'id',
                    'name',
                    'count'
                ]
            });
        });
    });

});