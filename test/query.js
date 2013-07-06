var assert = require('assert')

if(process.env.DARIUS_COVERAGE)
  var darius = require('../lib-cov/darius.js')
else
  var darius = require('..')


suite('Query')

test('one', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/?one=two')
  })

  server.get('/', function (req) {
    assert.equal(req.query.one, 'two')
    server.close(callback)
  })
})

test('two', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/?one=two&two=three')
  })

  server.get('/', function (req) {
    assert.equal(req.query.one, 'two')
    assert.equal(req.query.two, 'three')
    server.close(callback)
  })
})

test('four', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/?one=two&two=three&three=four&four=five')
  })

  server.get('/', function (req) {
    assert.equal(req.query.one, 'two')
    assert.equal(req.query.two, 'three')
    assert.equal(req.query.three, 'four')
    assert.equal(req.query.four, 'five')
    server.close(callback)
  })
})