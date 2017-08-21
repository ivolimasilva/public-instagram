'use strict'

var
    Axios = null;

const
    URL_INSTAGRAM_EXPLORE_TAGS = 'https://instagram.com/explore/tags/',
    URL_INSTAGRAM_GRAPHQL_QUERY = 'https://www.instagram.com/graphql/query/';

exports = module.exports = require('./lib');

/*
    exports.search = {

        init: (_query_id, _limit, _timeout) => {
            try {
                this.query_id = _query_id;
                this.limit = _limit;

                Axios = require('axios').create({
                    timeout: _timeout
                });
            } catch (error) {
                return error;
            }

            return true;
        },

        hashtag: {

            top: (_hashtag) => {
                console.log(this.query_id + ' ' + _hashtag);
            },

            recent: async (_hashtag, _count) => {

                var ids = [];

                Axios.get(URL_INSTAGRAM_EXPLORE_TAGS + _hashtag, {
                    params: {
                        __a: 1
                    }
                })
                    .then((response) => {
                        console.log('1. Success.');
                        console.log('Tag name:\t' + response.data.tag.name);
                        console.log('Media count:\t' + response.data.tag.media.count);
                        console.log('Page\'s Info:');
                        console.log('\tNext page?\t' + response.data.tag.media.page_info.has_next_page);
                        console.log('\tCursor?\t\t' + response.data.tag.media.page_info.end_cursor);

                        console.log('First page:');
                        var i = 0;
                        response.data.tag.media.nodes.forEach((node) => {
                            console.log(++i + '. ' + node.id);

                        });

                        console.log('\n\n\n');

                        console.log(this.limit);

                        if (response.data.tag.media.page_info.has_next_page) {
                            Axios.get(URL_INSTAGRAM_GRAPHQL_QUERY, {
                                params: {
                                    query_id: this.query_id,
                                    variables: {
                                        tag_name: _hashtag,
                                        first: this.limit,
                                        after: response.data.tag.media.page_info.end_cursor
                                    }
                                }
                            })
                                .then((response) => {
                                    console.log('2. Success.');
                                    console.log('Tag name:\t' + response.data.data.hashtag.name);
                                    console.log('Media count:\t' + response.data.data.hashtag.edge_hashtag_to_media.count);
                                    console.log('Page\'s Info:');
                                    console.log('\tNext page?\t' + response.data.data.hashtag.edge_hashtag_to_media.page_info.has_next_page);
                                    console.log('\tCursor?\t\t' + response.data.data.hashtag.edge_hashtag_to_media.page_info.end_cursor);

                                    console.log('Second page:');
                                    i = 0;
                                    response.data.data.hashtag.edge_hashtag_to_media.edges.forEach((edge) => {
                                        console.log(++i + '. ' + edge.node.id);
                                    });
                                })
                                .catch((error) => {
                                    console.log('2. Insuccess.');
                                    console.log(error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.log('1. Insuccess.');
                        console.log(error);
                    });
            }
        }

    }
*/