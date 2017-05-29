const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.get('/', function (request, response) {
   response.sendFile( __dirname + "/" + "example.html" );
});

app.post('/mailer', urlencodedParser, function (request, response) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '<username>@gmail.com',
            pass: '<password>'
        }
    });

    // setup email data
    let mailOptions = {
        from: '"Contact Form" <form sender address>', // sender address
        to: '<destination email address>', // list of receivers
        subject: 'Email from your Contact Form', // Subject line
        html: `<p>Email Address: ${request.body.emailaddress}</p><p style="white-space: pre-wrap">Message: ${request.body.message}</p>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            response.json({
                status: 'ERROR',
                message: error
            })
        } else {
            console.log(`Message: ${info.messageId} Sent: ${info.response}`);
            response.json({
                status: 'OK',
                message: info.response
            })
        }
    });
});

const server = app.listen(8081, function () {
   const host = server.address().address;
   const port = server.address().port;

   console.log(`Node.js Express emailer listening at http://${host}:${port}`)

});

