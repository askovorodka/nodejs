var exec = require("child_process").exec;
var querystring = require("querystring");

function sleep(milliSeconds){
    var start = new Date().getTime();
    var end = start + milliSeconds;
    while(end > new Date().getTime())
    {

    }
}
function start(response, postData){
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
        '<form action="/upload/" method="post">' +
        '<input type="text" name="name" placeholder="Name"><br>' +
        '<input type="email" name="email" placeholder="Email"><br>' +
        '<textarea name="text" placeholder="Text">' +
        '</textarea>' +
        '<button type="submit">Отправить</button>' +
        '</form>' +
        '</body>' +
        '</head>' +
        '</html>';

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(content);
    response.end();

}

function upload(response, postData){
    var content = "Request handler `upload` was called.";
    console.log(content);
    response.writeHead(200, {"Content-Type": "text/html"});
    var content = "\n\n\nRecieved [" + new Date().getTime() + "] <br>" +
        "name: " + querystring.parse(postData).name + '<br>' +
        'email: ' + querystring.parse(postData).email + '<br>' +
        'text: ' + querystring.parse(postData).text + '<br>' +
        '' +
        '';
    response.write(content);
    response.end();
}

exports.start = start;
exports.upload = upload;