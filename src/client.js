var msgpack = require('msgpack-js'),
    net = require('net')

var request = function (address, method, body, callback) {
  address = address.split(':')
  var host = address.shift()
  var port = address[0].match(/(\d*)/).pop()
  var url = address.pop().match(/(\/.*)$/).pop()
  var called = false
  
  if(typeof body === 'function') {
    callback = body
    body = {}
  }
  
  var socket = net.createConnection(port, host, function () {
    socket.end(msgpack.encode({
      url: url,
      method: method,
      body: body
    }), function () {
      socket.end()
      if(callback) {
        called = true
        callback()
      }
    })
  })
  
  socket.on('error', function (e) {
    if(callback && !called) callback(e)
    if(!callback) throw e
  })
}

/**
 * `GET` request
 *
 *     var url = '127.0.0.1:9128/john?key=value'
 *     darius.get(url, function (e) {
 *       console.log('successeful request')
 *     })
 *
 * @param {string} address
 * @param {object} [body]
 * @param {function} [callback]
 */
module.exports.get = function (address, body, callback) {
  request(address, 'get', body, callback)
}

/**
 * `POST` request
 *
 *     darius.post('127.0.0.1:9128/john?key=value', {
 *       some_key: 'some_value'
 *     }, function (e) {
 *       console.log('successeful request')
 *     })
 *
 * @param {string} address
 * @param {object} [body]
 * @param {function} [callback]
 */
module.exports.post = function (address, body, callback) {
  request(address, 'post', body, callback)
}

/**
 * `PUT` request
 *
 *     darius.put('127.0.0.1:9128/john?key=value', {
 *       some_key: 'some_value'
 *     }, function (e) {
 *       console.log('successeful request')
 *     })
 *
 * @param {string} address
 * @param {object} [body]
 * @param {function} [callback]
 */
module.exports.put = function (address, body, callback) {
  request(address, 'put', body, callback)
}

/**
 * `DEL` request
 *
 *     var url = '127.0.0.1:9128/john?key=value'
 *     darius.post(url, function (e) {
 *       console.log('successeful request')
 *     })
 *
 * @param {string} address
 * @param {object} [body]
 * @param {function} [callback]
 */
module.exports.del = function (address, body, callback) {
  request(address, 'del', body, callback)
}