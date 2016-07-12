

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


        /*if (request.url == '/upload/' && request.method.toLowerCase() == 'post') {
            // parse a file upload
            var form = new formidable.IncomingForm();
            form.parse(request, function(err, fields, files) {
                response.writeHead(200, {'content-type': 'text/plain'});
                response.write('received upload:\n\n');
                response.end(sys.inspect({fields: fields, files: files}));
            });
            return;
        }*/


        console.log("Request call");
        response.writeHead(200, {"Content-Type": "text/html"});
        var time = new Date();
        var pathname = url.parse(request.url).pathname;

        /*var postData = "";
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log('Recieved postDataChunk [' + new Date().getTime() + '] ' + postDataChunk + "\n\n\n");
        });

        request.addListener("end", function(){
            route(pathname, handler, response, postData, request);
        });*/

        route(pathname, handler, response, request);
        //response.end();

    }

    var http = require('http');
    var url = require('url');
    var formidable = require("formidable");
    var sys = require("util");

    http.createServer(func).listen(8888);

    console.log("Server has started");

}

exports.start = start;
