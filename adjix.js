var http = require('http');

var g = {};
g.adjix = "/shrinkLink?url={0}&partnerID=0dc66c5152844166af39fa0d06108be7";
g.reqUrl = g.adjix.replace('{0}',escape('http://www.guardian.co.uk/film/2011/jan/23/orson-welles-last-film-release'));
g.host = 'api.adjix.com';

var client = http.createClient(80, g.host);
var request = client.request('GET', g.reqUrl,
  {'host': g.host});
request.end();
request.on('response', function (response) {
  console.log('STATUS: ' + response.statusCode);
  console.log('HEADERS: ' + JSON.stringify(response.headers));
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});
