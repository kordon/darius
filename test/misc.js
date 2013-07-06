var assert = require('assert')

if(process.env.DARIUS_COVERAGE)
  var darius = require('../lib-cov/darius.js')
else
  var darius = require('..')


suite('Error')

test('request', function (callback) {
  darius.get('127.0.0.1:9128/', function (e) {
    assert(e)
    callback()
  })
})

test('listen', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.createServer().listen(9128).on('error', function (e) {
      assert(e)
      callback()
      server.close()
    })
  })
})