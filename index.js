#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('Chat:server');
var http = require('http');
var SocketIo = require('socket.io');
var sharedsession = require("express-socket.io-session");





/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || 8080);
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Create socket
 */
var io = new SocketIo(server);

io.use(sharedsession(app.get('session'), {
    autoSave:true
}));

console.log(app.get('session'));
io.on('connection', function(socket){
    console.log('connected socket:', socket.id);
    socket.on('chat-message', function(msg){
        if(!msg.trim()){
            return;
        }
        var formatedMsg = {
            text: msg,
            time: new Date(),
            autor: socket.handshake.session.email || 'guest'
        };
        io.emit('chat-message', formatedMsg)
    });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, server_ip_address);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
