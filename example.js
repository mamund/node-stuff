// 2011-01-20 (mca)
// the some example everyone else has, sorry.

var http = require('http');

var g = {};
g.port = 8124;
g.ip = '127.0.0.1';

http.createServer(hello).listen(g.port, g.ip);
console.log('Server running at http://'+g.ip+':'+g.port+'/');  

function hello(req, res) 
{
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World, mamund!\n');
}
  

