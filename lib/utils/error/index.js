'use strict';

/**
 * Returns the comments of a post
 * @module Utils.error
 * @param {Object} response
 * @return {Object} Error object with message and raw body of the error
 */
exports = module.exports = (response) => {
    return {
        message: 'Error message',
        raw: response
    }
}