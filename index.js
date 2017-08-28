":" //; exec /usr/bin/env node --harmony --expose-gc --trace-deprecation "$0" "$@"
var http = require('http');
var fs = require('fs');
var url = require('url');

const parseQuery = (queryString) => {
  let query = {}
  queryString.split('&&').forEach((item) => {
    let oneQuery = item.split('=');
    if(oneQuery.length == 1) {
      query[oneQuery[0]] = true
    } else {
      query[oneQuery[0]] = oneQuery[1] 
    };
  });
  return query;
};

const methodHeandler = (method, cb, ...rest) => {
  switch (method) {
    case 'DELETE':
      cd && rest ? cb(rest) : cd && !rest ? cd() : null
      break;
    case 'POST':
      cd && rest ? cb(rest) : cd && !rest ? cd() : null
      break;
    case 'GET':
      cd && rest ? cb(rest) : cd && !rest ? cd() : null
      break;
    case 'PUT':
      cd && rest ? cb(rest) : cd && !rest ? cd() : null
      break;
  }
}

http.createServer((request, response) => {
   const url = url.parse(request.url);
   const METHOD = request.method;
   const query = parseQuery(pathname.query)
   console.log(query + " received.");

   fs.readFile(pathname.pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else {	
         response.writeHead(200, {'Content-Type': 'text/html'});	
         response.write(data.toString());		
      }
      response.end();
   });   
}).listen(8085);

console.log('Server running at http://127.0.0.1:8081/');