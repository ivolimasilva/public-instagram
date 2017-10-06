var
    Chai = require('chai'),
    Expect = require('chai').expect,
    Instagram = require('../../index');

Chai.use(require('chai-json-schema'));

describe('Media', () => {

    describe('Get(_shortcode)', () => {
        it('Testing schema of return object', async () => {
            const post = await Instagram.media.get('BP-rXUGBPJa');
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

    describe('Comments(_shortcode, _limit)', () => {

        it('Testing type and length of return object', async () => {
            const comments = await Instagram.media.comments('BP-rXUGBPJa', 500)
            Expect(comments).to.be.an('array');
            Expect(comments).to.have.lengthOf(500);
        });

        it('Testing schema of return object', async () => {
            const comments = await Instagram.media.comments('BP-rXUGBPJa', 500)
            Expect(comments[0]).to.be.jsonSchema({
                type: 'object',
                required: ['id', 'text', 'timestamp', 'owner'],
                properties: {
                    id: {
                        type: 'string'
                    },
                    text: {
                        type: 'string'
                    },
                    timestamp: {
                        type: 'number'
                    },
                    owner: {
                        type: 'object',
                        required: ['id', 'username', 'image'],
                        properties: {
                            id: {
                                type: 'string'
                            },
                            username: {
                                type: 'string'
                            },
                            image: {
                                type: 'string'
                            }
                        }
                    }
                }
            });
        });
    });

});