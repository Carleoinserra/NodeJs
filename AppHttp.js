
   
const fs = require('fs');
    
    
    
        
var http = require('http');
http.createServer(function (req, res) {
  
    if (req.url == "/" && req.method == "get"){
    let home = fs.readFileSync('file.html').toString();
    
  res.writeHead(200, {'Content-Type': 'text/html'});
  res
  res.end(home);}
  else if (req.url == "/contatti") {
    let c1 = fs.readFileSync('contact.html').toString();
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res
    res.end(c1);


  }
}).listen(8080);