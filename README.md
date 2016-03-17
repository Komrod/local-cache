# local-cache
Node JS local JSON cache

## Install:
npm install local-cache [--save]

## Usage:

var Cache = require('local-cache');
var cache = new Cache();

cache.write('stats', object);

var content = cache.read('stats');


