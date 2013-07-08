var assert = require('assert')

if(process.env.DARIUS_COVERAGE)
  var darius = require('../lib-cov/darius.js')
else
  var darius = require('..')


suite('methods')

test('get', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/')
  })
  
  server.get('/', function (req) {
    server.close(callback)
  })
})

test('post', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.post('127.0.0.1:9128/')
  })

  server.post('/', function (req) {
    server.close(callback)
  })
})

test('put', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.put('127.0.0.1:9128/')
  })

  server.put('/', function (req) {
    server.close(callback)
  })
})

test('del', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.del('127.0.0.1:9128/')
  })

  server.del('/', function (req) {
    server.close(callback)
  })
})