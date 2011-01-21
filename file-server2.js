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
function fileServer(req,res)
{
  var g = {};
  init();
  
  function init()
  {
    // init vars
    g.file = path.join(process.cwd(),url.parse(req.url).pathname);
    g.contentType = "text/plain";
    
    path.exists(g.file, checkFile);
  }

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
      res.writeHead(200);
      res.write(file,"binary");
      res.end();
    }
    return;
  }
  
  function sendError(status,msg)
  {
    res.writeHead(status,[["Content-Type",g.contentType]]);
    if(msg)
    {
      res.write(msg + '\n');
    }
    res.end();
    return;
  }
}


