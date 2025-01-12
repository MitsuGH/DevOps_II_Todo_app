const http = require('http');
const PORT = 8080;
const fs = require('fs');

const server = http.createServer(function(req, res){
    console.log("Start reading file");

    fs.readFile('./html/hello.html', function(err, deta){
        res.writeHead(200, {'Content-type':'text/html'});
        res.write(deta);
        res.end();
    });

    console.log("End reading file")

    fs.writeFile('./html/newfile.txt', 'Hello, Text file', function(err){
        if(err) throw err;
        console.log("Created new text file");
    });

    fs.appendFile('./html/newfile.txt', 'Hello, me', function(err){
        if(err) throw err;
        console.log("Updated new text file");
    });
});

server.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);
});