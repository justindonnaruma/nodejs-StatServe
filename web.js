var PORT = Number(process.env.PORT || 1337);       // port# to run this server/app on
var oneDay = 86400000;

var sendgrid = require('sendgrid')('<API USER>', '<API PASSWORD>')

var express = require("express");
var app = express();

app.configure(function() {
    app.use(express.compress());
    app.use(express.multipart());               // Required for accepting form submissions
    app.use(express.json());                    // Required for accepting form submissions
    app.use(express.urlencoded());              // Required for accepting form submissions
    app.use(express.static(__dirname + '/public', { maxAge: oneDay }));
});


app.post('/', function(req, res){

    sendgrid.send({
        to: '<Email Address>',                  // Where do you want the email to go to?
        from: req.body.email,                   // Pulls email address from form
        subject: '<Subject>',                   // Email Subject - "Website Form Submission"
        html: '<HTML Email Body>',
        text: '<TEXT Email Body>'
    }, function(err, json) {
        if (err) {
            res.end("Something Went Wrong - Please try again later");
            return console.error(err); }
        console.log(json);
        res.end("Message Sent Successfully!")
    });
});

// startup this server
app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});