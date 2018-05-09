let http = require("http");
let url = require("url");
let util = require("util");
http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    // url.parse(req.url);
    let urlStr = util.inspect(url.parse(req.url));
    res.end(urlStr);
}).listen(3000, '127.0.0.1', ()=>{
    console.log("server running");
})
