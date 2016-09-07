const http = require('http');
const handlebars = require('handlebars');
const fs = require('fs');

function htmlBody() {
  var layout = fs.readFileSync("layout.html", 'utf8');
  var template = handlebars.compile(layout);
  var data = JSON.parse(fs.readFileSync("inputs.json"));
  data["amp_css"] = fs.readFileSync(data["amp_css"]);
  data["content"] = fs.readFileSync(data["content"]);

  var outputString = template(data);
  return outputString;
}

// http.get({path: "/"}, (res)=> {
//
// });

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(htmlBody());
  response.end()
});

server.listen(2368);
console.log("Listening on http://localhost:2368")