// 2011-01-20 (mca)
// simple plain-text file server

// modules
var sys = require('sys');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// fire it all off
http.createServer(fileServer).listen(8124);
sys.puts("Server is running at http://localhost:8124/");

// define server
function fileServer(request,response)
{
  var g = {};
  g.path = url.parse(request.url).pathname;
  g.file = path.join(process.cwd(),g.path);
  
  path.exists(g.file,function(exists)
  {
    if(!exists)
    {
      response.writeHead(404,[["content-type","text/plain"]]);
      response.write("404 Not Found");
      response.end();
      return;
    }
    else
    {
      fs.readFile(g.file,"binary",function(err,file)
      {
        if(err)
        {
          response.writeHead(500,[["content-type","text/plain"]]);
          response.write(err + '\n');
          response.end();
          return;
        }
        else
        {
          response.writeHead(200);
          response.write(file,"binary");
          response.end();
          return;
        }
      });
    }
  });
}


