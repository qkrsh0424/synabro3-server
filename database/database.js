//static file load
const fs = require('fs');

//mysql setting
const mysql = require('mysql');
const dbinfo = fs.readFileSync(__dirname+'/database.json');
const conf = JSON.parse(dbinfo);
const connect = mysql.createConnection({
    host:conf.host,
    user:conf.username,
    password:conf.password,
    port:conf.port,
    database:conf.db
});

//database connect
var dbconn = connect.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('DB was prepared');
    }
});

module.exports = connect;
