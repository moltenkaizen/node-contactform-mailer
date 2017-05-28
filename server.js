const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      name: req.body.name,
      emailaddress: req.body.emailaddress,
      message: req.body.message
   };
   console.log(response);
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '<username>@gmail.com',
            pass: '<gmail password>'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Contact Form" <synologybot@gmail.com>', // sender address
        to: 'sfoxorama@gmail.com', // list of receivers
        subject: 'Contact Form from Profile Website', // Subject line
        html: `<p>Email Address: ${response.emailaddress}</p><p style="white-space: pre-wrap">Message: ${response.message}</p>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Message ${info.messageId} sent: ${info.response}`);
        response.emailStatus = `Message ${info.messageId} sent: ${info.response}`
    });
    res.end(JSON.stringify(response));
})

const server = app.listen(8081, function () {
   const host = server.address().address
   const port = server.address().port

   console.log(`Node.js Express emailer listening at http://${host}:${port}`)

})

