const http = require("http");

const server = http.createServer((req,res)=>{
    const url = req.url
    console.log(url,"url")

    if (url === "/") {
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end("this is home page")
    }else if (url === '/projects') {
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end("this is project page")
    }else{
        res.writeHead(400,{'Content-Type':'text/plain'});
        res.end("this is not found")
    }
})


const port = 3000

server.listen(port,()=>{
    console.log("Server is running");
    
})