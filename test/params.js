var assert = require('assert')

if(process.env.DARIUS_COVERAGE)
  var darius = require('../lib-cov/darius.js')
else
  var darius = require('..')


suite('params')

test('one', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/two')
  })

  server.get('/:one', function (req) {
    assert.equal(req.params.one, 'two')
    server.close(callback)
  })
})

test('two', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/two/three')
  })

  server.get('/:one/:two', function (req) {
    assert.equal(req.params.one, 'two')
    assert.equal(req.params.two, 'three')
    server.close(callback)
  })
})

test('four', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/two/three/r/four/a/five')
  })

  server.get('/:one/:two/r/:three/a/:four', function (req) {
    assert.equal(req.params.one, 'two')
    assert.equal(req.params.two, 'three')
    assert.equal(req.params.three, 'four')
    assert.equal(req.params.four, 'five')
    server.close(callback)
  })
})