var mysql = require('mysql');
var bodyParser = require('body-parser');

const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var my_database = mysql.createConnection({
                host: $DATABASE_ENDPOINT,
                port : $PORT,
                user : $USERNAME,
                password: $PASSWORD,
                database: $DATABASE_nAME
});


app.post('/sms', (req, res) => {
        const twiml = new MessagingResponse();
        console.log(req.body);

        twiml.message("Thank you. We will contact you when your car can be picked up.");
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());

        var number = req.body.From.toString();
        var message = req.body.Body;
        var query = "INSERT INTO sms (number, message) VALUES (?, ?)";
        var inserts = [req.body.From.toString(), req.body.Body];
        queryString = mysql.format(query, inserts);

	//adds the message to the database
        my_database.query(queryString, function(err, result, fields){
                if (err) throw err;
                console.log("record inserted");
            });

});

http.createServer(app).listen(1336, () => {
        console.log('Port 1336');
});


