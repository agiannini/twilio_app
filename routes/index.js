
const bodyParser = require('body-parser');
var mysql = require('mysql');
const express = require('express');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var router = express.Router();
var data;


var my_database = mysql.createConnection({
     host: $DATABASE_ENDPOINT,
     port : $PORT_NUMBER,
     user : $USERNAME,
     password: $PASSWORD,
     database: $DATABASE_NAME
});




router.get('/', function(req, res, next){
    my_database.connect(function(err){
        console.log("connected");
        my_database.query("SELECT * from sms", function(err,   result, fields){
             data = result;
        });
   });

 	res.render('index.jade', { test: "hello", results: data}) ;
});



module.exports = router;


