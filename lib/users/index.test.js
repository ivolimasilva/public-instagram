var
    Chai = require('chai'),
    Expect = require('chai').expect,
    Instagram = require('../../index');

Chai.use(require('chai-json-schema'));

describe('Users', () => {

    describe('Info(_username)', () => {
        it('Testing schema of return object', async () => {
            const user = await Instagram.users.info('instagram');
            Expect(user).to.be.jsonSchema({
                type: 'object',
                required: ['id', 'username', 'name', 'bio', 'followers', 'follows', 'image', 'posts'],
                properties: {
                    id: {
                        type: 'string'
                    },
                    username: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    bio: {
                        type: 'string'
                    },
                    followers: {
                        type: 'number'
                    },
                    follows: {
                        type: 'number'
                    },
                    image: {
                        type: 'string'
                    },
                    posts: {
                        type: 'object',
                        required: ['count'],
                        properties: {
                            count: {
                                type: 'number'
                            }
                        }
                    }
                }
            });
        });
    });

    describe('Info(_username)', () => {
    });

});