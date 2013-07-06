var assert = require('assert')

if(process.env.DARIUS_COVERAGE)
  var darius = require('../lib-cov/darius.js')
else
  var darius = require('..')


suite('Body')

test('bol', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/', {
      bool: true,
      unbool: false
    })
  })

  server.get('/', function (req) {
    assert.equal(req.body.bool, true)
    assert.equal(req.body.unbool, false)
    server.close(callback)
  })
})

test('array', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/', {
      bools: [true, false],
      arrays: [[], [1]],
      strings: ['2', '2'],
      numbers: [1, 2],
    })
  })
  
  server.get('/', function (req) {
    assert.equal(req.body.bools.length, 2)
    assert.equal(req.body.arrays.length, 2)
    assert.equal(req.body.strings.length, 2)
    assert.equal(req.body.numbers.length, 2)
    assert.equal(req.body.arrays[0].length, 0)
    assert.equal(req.body.arrays[1].length, 1)
    
    assert.equal(req.body.bools[0], true)
    assert.equal(req.body.bools[1], false)
    
    assert.equal(req.body.arrays[0][0], undefined)
    assert.equal(req.body.arrays[1][0], 1)
    
    assert.equal(req.body.strings[0], '2')
    assert.equal(req.body.strings[1], '2')
    
    assert.equal(req.body.numbers[0], 1)
    assert.equal(req.body.numbers[1], 2)

    server.close(callback)
  })
})

test('string', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/', {
      single: 'i\'m single',
      doubl: "i\'m double"
    })
  })
  
  server.get('/', function (req) {
    assert.equal(req.body.single, 'i\'m single')
    assert.equal(req.body.doubl, 'i\'m double')
    server.close(callback)
  })
})

test('number', function (callback) {
  var server = darius.createServer().listen(9128, function () {
    darius.get('127.0.0.1:9128/', {
      one: 1,
      two: 2
    })
  })
  
  server.get('/', function (req) {
    assert.equal(req.body.one, 1)
    assert.equal(req.body.two, 2)
    server.close(callback)
  })
})