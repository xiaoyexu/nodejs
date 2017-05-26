var http=require('http');
http.createServer(
  function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>Here is Node JS</h1>');
    res.end('<br>');
  }
).listen(3000);
console.log('Started at port 3000');
