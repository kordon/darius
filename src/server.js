var msgpack = require('msgpack-js'),
    mr = require('match-route'),
    net = require('net')

var middleware = function (socket) {
  var server = this

  var port = server.address().port
  var host = server.address().address
  
  var length = 0
  var data = []
  
  socket.on('data', function (chunk) {
    length += chunk.length
    data.push(chunk)
  })
  
  socket.on('end', function () {
    var buf = new Buffer(length)
    
    for (var i=0, len = data.length, pos = 0; i < len; i += 1) {
      data[i].copy(buf, pos)
      pos += data[i].length
    }
    
    data = msgpack.decode(buf)
    
    mr(data, server.routes, function (value, route, params, query) {
      value({
        port: port,
        host: host,
        params: params,
        query: query,
        body: data.body
      })
    })
  })
}

/**
 * Create TCP server.
 *
 * Related: [net Node.js Manual & Documentation](http://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener)
 *
 *     darius.createServer().listen(9128, function () {
 *       console.log('server is listening')
 *     })
 *
 * @param {object} [options]
 * @returns {server}
 */
module.exports = function (options) {
  var server = net.createServer(options, middleware)
  server.routes = {get: {}, post: {}, put: {}, del: {}}
  
  /**
   * Listen to a `GET` request.
   *
   *     server.get('/:user', function (req) {
   *       assert.ok(req.params.user === 'john')
   *       assert.ok(req.query.key === 'value')
   *     })
   *
   *     var url = '127.0.0.1:9128/john?key=value'
   *     darius.get(url, function (e) {
   *       if(!e) console.log('successeful request')
   *     })
   *
   * @param {string} route
   * @param {function} callback(req)
   */
  server.get = function (route, callback) {
    server.routes.get[route] = callback
  }
  
  /**
   * Listen to a `POST` request.
   *
   *     server.post('/:user', function (req) {
   *       assert.ok(req.params.user === 'john')
   *       assert.ok(req.query.key === 'value')
   *       assert.ok(req.body.some_key === 'some_value')
   *     })
   *
   *     darius.post('127.0.0.1:9128/john?key=value', {
   *       some_key: 'some_value'
   *     }, function (e) {
   *       if(!e) console.log('successeful request')
   *     })
   *
   * @param {string} route
   * @param {function} callback(req)
   */
  server.post = function (route, callback) {
    server.routes.post[route] = callback
  }
  
  /**
   * Listen to a `PUT` request.
   *
   *     server.put('/:user', function (req) {
   *       assert.ok(req.params.user === 'john')
   *       assert.ok(req.query.key === 'value')
   *       assert.ok(req.body.some_key === 'some_value')
   *     })
   *
   *     darius.put('127.0.0.1:9128/john?key=value', {
   *       some_key: 'some_value'
   *     }, function (e) {
   *       if(!e) console.log('successeful request')
   *     })
   *
   * @param {string} route
   * @param {function} callback(req)
   */
  server.put = function (route, callback) {
    server.routes.put[route] = callback
  }
  
  /**
   * Listen to a `DEL` request.
   *
   *     server.del('/:user', function (req) {
   *       assert.ok(req.params.user === 'john')
   *       assert.ok(req.query.key === 'value')
   *     })
   *
   *     var url = '127.0.0.1:9128/john?key=value'
   *     darius.del(url, function (e) {
   *       if(!e) console.log('successeful request')
   *     })
   *
   * @param {string} route
   * @param {function} callback(req)
   */
  server.del = function (route, callback) {
    server.routes.del[route] = callback
  }
  
  server.__listen = server.listen
  server.listen = function () {
    server.__listen.apply(server, arguments)
    return server
  }
  
  return server
}