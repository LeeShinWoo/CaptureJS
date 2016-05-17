var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var mysql = require('mysql');

app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/views'));


//mysql 관련 소스
var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : 'password',
    database:'test'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});
var query = connection.query('select * from users',function(err,rows){
    for(var i=0;i<rows.length;i++){
      console.log(rows[i].userid);
    }

    // console.log(rows);
});

// var query2 = connection.query('select * from users where userid='+mysql.escape('123'),function(err,rows){
//     console.log(rows);
// });






//mysql test end
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));
var router = require('./router/main')(app, fs, connection);

var server = app.listen(3000, function(){
  console.log('Express server has started on port 3000');
});
