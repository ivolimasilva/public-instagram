var
    Chai = require('chai'),
    Expect = require('chai').expect,
    Instagram = require('../../index');

Chai.use(require('chai-json-schema'));

describe('Tags', function () {

    this.timeout(2500);

    describe('Info()', () => {
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

    describe('Recent()', () => {
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

});