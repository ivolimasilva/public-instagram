var
    Chai = require('chai'),
    Expect = require('chai').expect,
    Instagram = require('../../index');

Chai.use(require('chai-json-schema'));

describe('Media', () => {

    describe('Get(_shortcode)', () => {
        it('Testing schema of return object', async () => {
            const post = await Instagram.media.get('BQYvbMmAgHz');
            Expect(post).to.be.jsonSchema({
                type: 'object',
                required: ['id', 'caption', 'shortcode', 'image', 'dimensions', 'likes', 'comments', 'owner', 'timestamp'],
                properties: {
                    id: {
                        type: 'string'
                    },
                    caption: {
                        type: 'string'
                    },
                    shortcode: {
                        type: 'string'
                    },
                    image: {
                        type: 'string'
                    },
                    dimensions: {
                        type: 'object'
                    },
                    likes: {
                        type: 'object'
                    },
                    comments: {
                        type: 'object'
                    },
                    owner: {
                        type: 'object'
                    },
                    timestamp: {
                        type: 'number'
                    }
                }
            });
        });
    });

});