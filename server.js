

function say(word){
    console.log(word);
}

function execute(someFunction, value){
    someFunction(value);
}

//execute(say, "Hello World!!!");

function start(route, handler)
{
    var func = function(request, response){
        console.log("Request call");
        response.writeHead(200, {"Content-Type": "text/html"});
        var time = new Date();
        var pathname = url.parse(request.url).pathname;

        var postData = "";
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log('Recieved postDataChunk [' + new Date().getTime() + '] ' + postDataChunk + "\n\n\n");
        });

        request.addListener("end", function(){
            route(pathname, handler, response, postData);
        });

        //route(pathname, handler, response);

        //response.end();
    }

    var http = require('http');
    var url = require('url');

    http.createServer(func).listen(8888);

    console.log("Server has started");

}

exports.start = start;
