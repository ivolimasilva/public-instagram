'use strict';

exports = module.exports = {

    user: require('./user'),

    /**
     * Returns the post of a media query
     * @module Utils.parser
     * @param {String} _response
     * @return {Object} Post - Parsed post that result of given media query
     */
    post: require('./post'),

    /**
     * Returns the posts of an hashtag search
     * @module Utils.parser
     * @param {String} _response
     * @return {Array} Posts - Parsed posts that result of given search
     */
    posts: require('./posts'),

    /**
     * Returns the hashtags of a search
     * @module Utils.parser
     * @param {String} _response
     * @return {Array} Hashtags - Parsed hashtags that result of given search
     */
    hashtags: require('./hashtags'),

    /**
     * Returns the posts of a user profile
     * @module Utils.parser
     * @param {String} _response
     * @return {Array} Posts - Parsed posts that belong to that user profile (only posts made of single images)
     */
    timeline: require('./timeline'),

    /**
     * Returns the comments of a post
     * @module Utils.parser
     * @param {String} _response
     * @return {Array} Comments - Parsed comments that belong to that post
     */
    comments: require('./comments')

};