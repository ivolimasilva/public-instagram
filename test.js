var instagram = require('./index');

// Initialization
console.log(instagram.search.init(17875800862117404, 500, 360000));

// Get recent
instagram.search.hashtag.recent('hpow', 1000);