# node-contactform-mailer

### Simple Node.js/Express Contact form emailer


#### Setup
<pre>
npm install
node server.js
</pre>
* Configure Gmail
  * [Allowing less secure apps to access your account](https://support.google.com/accounts/answer/6010255?hl=en)
* Configure gmail account user/pass and destination email address in server.js
<pre>
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
</pre>


#### TO DO
* Handle newlines in message body.

### Completed TODOs
* Respond with JSON success or failure (Done!)
* Make the test index.htm slightly less terrible looking (Done!)
