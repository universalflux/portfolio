var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP", {
	service: "Gmail",
	auth: {
		user: "clientmasx@gmail.com",
		pass: "Universal10x!"
	}
});

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname + '/client')));

// require('./server/config/mongoose.js');
// require('./server/config/routes.js')(app);

app.listen('2020', function(req, res) {
	console.log("We are now listening on port 2020");
});

app.post('/mail', function(req, res){
	console.log(req.body);
	smtpTransport.sendMail({
		from: req.body.name += '<' + req.body.email + '>',
		to: "Roger <rogermasx@gmail.com>",
		subject: req.body.subject,
		text: req.body.summary += " " + '- clients info is ' + req.body.email + ", " + req.body.contact
	}, 
	function(err, res){
		if (err){
			console.log(err);
		} else {
			console.log("message successfully sent!");
		}
	})
});