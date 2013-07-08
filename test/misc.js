var assert = require('assert')

if(process.env.DARIUS_COVERAGE)
  var darius = require('../lib-cov/darius.js')
else
  var darius = require('..')


suite('error')

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

suite('success')

test('callback', function (callback) {
  var cbs = 0
  
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/', function (e) {
      assert(!e)
      cbs += 1
      
      if(cbs === 2) callback()
    })
  })
  
  server.get('/', function (req) {
    server.close()
    
    cbs += 1
    
    if(cbs === 2) callback()
  })
})