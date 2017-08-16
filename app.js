var Axios = require('axios'),
    tag_name = 'hpow',
    query_id = 17875800862117404;

Axios.get('https://www.instagram.com/explore/tags/' + tag_name, {
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

        if (response.data.tag.media.page_info.has_next_page) {
            Axios.get('https://www.instagram.com/graphql/query/', {
                params: {
                    query_id: query_id,
                    variables: {
                        tag_name: tag_name,
                        first: 500,
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

/*
Axios.get('https://www.instagram.com/graphql/query/', {
    params: {
        query_id: 17875800862117404,
        variables: {
            tag_name: 'hpow',
            first: 651
        }
    },
    timeout: 3600000
})
    .then((response) => {
        console.log('Success.');
        console.log('Popular media:\t' + response.data.data.hashtag.edge_hashtag_to_top_posts.edges.length);
        console.log('Recent media:\t' + response.data.data.hashtag.edge_hashtag_to_media.edges.length);
        console.log('Media count:\t' + response.data.data.hashtag.edge_hashtag_to_media.count);
        console.log('Page\'s Info:');
        console.log('\tNext page?\t' + response.data.data.hashtag.edge_hashtag_to_media.page_info.has_next_page);
        console.log('\tCursor?\t\t' + response.data.data.hashtag.edge_hashtag_to_media.page_info.end_cursor);
    })
    .catch((error) => {
        console.log('Insuccess.');
        console.log(error.response);
    });
*/