const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

function sendSignUpEmail(userEmail, userName) {
    var transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    }));

    var mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: userEmail,
        subject: "Solicitud de registro de Padel play",
        text: `Hola ${userName}:\n\nSu solicitud de registro para el club deportivo Padel play se está tramitando lo más rápido posible. Le avisaremos en cuanto se apruebe.\n\nUn saludo,\n\nPadel play.`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.err(`Error sending signup mail to ${userEmail}: ${error}`);
        }
    });
}


module.exports = {
    sendSignUpEmail
}