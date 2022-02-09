const nodemailer = require('nodemailer');

let RES_LINT      = process.argv[2] == 0 ? 'SUCCSESS' : 'FAILED'
let RES_TEST      = process.argv[3] == 0 ? 'SUCCSESS' : 'FAILED'
let RES_UPDATE    = process.argv[4] == 0 ? 'SUCCSESS' : 'FAILED'
let RES_PUSH      = process.argv[5] == 0 ? 'SUCCSESS' : 'FAILED'
let RES_DEPLOY    = process.argv[6] == 0 ? 'SUCCSESS' : 'FAILED'
let GMAIL_PASS    = process.argv[7]
let EMAIL_NOTIF   = process.argv[8]


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GEMAIL,
    pass: GMAIL_PASS // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: GEMAIL,
  to: EMAIL_NOTIF,
  subject: 'Resultado de la pipeline ejecutada',
  html: `<div>
            <h4> Se ha realizado un push en la rama main, que ha provocado la ejecución del workflow con los siguientes resultados:</h4>
            <h5> STAGE Linter       : ${RES_LINT}   </h5>
            <h5> STAGE Tests        : ${RES_TEST}   </h5>
            <h5> STAGE Update Readme: ${RES_UPDATE} </h5>
            <h5> STAGE Push Changes : ${RES_PUSH}   </h5>
            <h5> STAGE Deploy Vercel: ${RES_DEPLOY} </h5>
        </div>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});