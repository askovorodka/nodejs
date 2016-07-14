var mysql = require("mysql");

var client = mysql.createConnection({
    host: 'mysql.loc',
    user: 'root',
    password: 'password',
    port: '13306',
    database: 'ilottery'
});

client.connect();

client.query("select * from `user`", function(errors, rows, fields){
    console.log(rows);
});

client.end();