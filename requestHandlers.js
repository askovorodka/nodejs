var exec = require("child_process").exec;
var querystring = require("querystring");
var formidable = require("formidable");
var sys = require("util");
var http = require("http");
var fs = require("fs");

function sleep(milliSeconds){
    var start = new Date().getTime();
    var end = start + milliSeconds;
    while(end > new Date().getTime())
    {

    }
}
function start(response, request){

    //sleep(5000);
    var content = "empty";
    var str = "Request handler `start` was called.";

    /*console.log(str);
    exec("find /", function(error, stdout, stderr){
        content = stdout;
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
        response.end();
    });*/

    var content = '<html>' +
        '<head>' +
        '<title>Test Page</title>' +
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />' +
        '<body>' +
        '<form action="/upload/" method="post" enctype="multipart/form-data">' +
        '<input type="text" name="name" placeholder="Name"><br>' +
        '<input type="email" name="email" placeholder="Email"><br>' +
        '<textarea name="text" placeholder="Text"></textarea><br>' +
        '<input type="file" name="photo"><br>' +
        '<button type="submit">Отправить</button>' +
        '</form>' +
        '</body>' +
        '</head>' +
        '</html>';

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(content);
    response.end();

}

function upload(response, request){
    var content = "Request handler `upload` was called.";
    console.log(content + request.method);

    if (request.method.toLowerCase() == 'post')
    {
        var form = new formidable.IncomingForm();

        form.parse(request, function(err, field, files){

            fs.rename(files.photo.path, "/tmp/test.png", function (error) {
                if (error)
                {
                    fs.unlink("/tmp/test.png");
                    fs.rename(files.photo.path, "/tmp/test.png");
                }
            })

            response.writeHead(200, {"Content-Type":"text/html"});
            response.write("image uploaded: <br><br>");
            response.write("<img src='/show' />");
            response.end();

         });

        return;
    }

    /*response.writeHead(200, {"Content-Type": "text/html"});
    var content = "\n\n\nRecieved [" + new Date().getTime() + "] <br>" +
        "name: " + querystring.parse(postData).name + '<br>' +
        'email: ' + querystring.parse(postData).email + '<br>' +
        'text: ' + querystring.parse(postData).text + '<br>' +
        '' +
        '';
    response.write(content);
    response.end();*/

}

function show(response, request)
{
    console.log('Request method `show` was called.');
    fs.readFile("/tmp/test.png", "binary", function(error, file){
        if (error)
        {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else
        {
            response.writeHead(200, {"Content-Type" : "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;