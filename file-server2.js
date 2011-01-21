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
  
  // init vars
  g.path = url.parse(request.url).pathname;
  g.file = path.join(process.cwd(),g.path);
  g.contentType = "text/plain";
  
  // handle the request
  path.exists(g.file, checkFile);

  function checkFile(exists)
  {
    if(!exists)
    {
      sendError(404,"Not Found");
    }
    else
    {
      fs.readFile(g.file,"binary",sendFile);
    }
    return;
  }

  function sendFile(err,file)
  {
    if(err)
    {
      sendError(500,err);
    }
    else
    {
      response.writeHead(200);
      response.write(file,"binary");
      response.end();
    }
    return;
  }
  
  function sendError(status,msg)
  {
    response.writeHead(status,[["Content-Type",g.contentType]]);
    if(msg)
    {
      response.write(msg + '\n');
    }
    response.end();
    return;
  }
}


