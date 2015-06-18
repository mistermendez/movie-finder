var express = require('express');
var compression = require('compression');
var server = express();
var port = process.env.PORT || 4444;

server.use(compression());
server.use(express.static(__dirname + '/public'));
server.listen(port);

console.log('Listening on port ' + port);
