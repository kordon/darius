# darius

[![NPM version](https://badge.fury.io/js/darius.png)](http://badge.fury.io/js/darius)
[![Build Status](https://secure.travis-ci.org/kordon/darius.png)](http://travis-ci.org/kordon/darius)
[![Dependency Status](https://gemnasium.com/kordon/darius.png)](https://gemnasium.com/kordon/darius)
[![Coverage Status](https://coveralls.io/repos/kordon/darius/badge.png?branch=master)](https://coveralls.io/r/kordon/darius?branch=master)

## install

```bash
npm install darius
```

## example

```js
var darius = require('darius')

var server = darius.createServer().listen(9128, function () {
  console.log('server listening on port 9128')
  
  darius.post('127.0.0.1:9128/hello?from=client', {
    some_key: 'some_value'
  }, function (e) {
    if(!e) console.log('message sent')
  })
})

server.port('/:greeting', function (req) {
  assert.equal(req.params.greeting, 'hello')
  assert.equal(req.query.from, 'client')
  assert.equal(req.body.some_key, 'some_value')
})
```

## license

MIT