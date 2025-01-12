const http = require("http");
const PORT = 8080;

const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-type':'text/html'});
    res.write("<h1>Hello, NodeJS!</h1>");
    res.end();
});

server.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);
});