const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'noreply@2018jlwranglerevent.com',
    pass: 'FCAautomatik'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

// contact emails
router.post('/notes', (req, res) => {
  // get contact data
  const data = req.body;
  const notes = data.notes;
  let i = 0;
  const l = notes.length;

  let textContent = 'Hello ' + data.first_name + ',\n\n';
  textContent += 'Here are all the notes you took during the All-New Jeep Wrangler In-Dealership Experience:\n\n';

  let htmlContent = '<div style="font-size:14px; margin:30px auto 60px; width:640px;"><span>';
  htmlContent += 'Hello ' + data.first_name + ',<br><br>';
  htmlContent += 'Here are all the notes you took during the All-New Jeep Wrangler In-Dealership Experience:<br><br>';

  for (i; i < l; i++) {
    textContent += notes[i].module + '\n';
    textContent += notes[i].notes + '\n\n';

    htmlContent += '<a href="' + notes[i].url + ' target="_blank" style="font-size:18px; font-weight:bold;">' + notes[i].module + '</a><br>';
    htmlContent += notes[i].notes.replace(/\n/g, '<br>') + '<br><br>';
  }

  htmlContent += '</span></div>';

  let mailOptions = {
    from: '"Jeep" <noreply@2018jlwranglerevent.com>', // sender address
    to: data.email, // list of receivers
    replyTo: data.email, // list of replyTo's
    subject: 'Your Notes from the 2018 JL Wrangler Event', // Subject line
    text: textContent, // plaintext body
    html: htmlContent // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error);
      // return console.log(error);
    } else {
      return res.status(250).send(info);
      // return console.log('Message sent: ', info.response);
    }
  });
});

module.exports = router;
