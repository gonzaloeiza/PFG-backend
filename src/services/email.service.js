require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.NODEMAILER_CLIENT_ID,
    process.env.NODEMAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.NODEMAILER_REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.NODEMAILER_EMAIL,
      accessToken,
      clientId: process.env.NODEMAILER_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
      refreshToken: process.env.NODEMAILER_REFRESH_TOKEN
    }
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
    try {
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
    } catch(exception) {
        console.log(exception);
    }
};


function sendSignUpEmail(userEmail, userName) {
    var mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: userEmail,
        subject: "Solicitud de registro de Padel play",
        text: `Hola ${userName}:\n\nSu solicitud de registro para el club deportivo Padel play se está tramitando lo más rápido posible. Le avisaremos en cuanto se apruebe.\n\nUn saludo,\n\nPadel play.`
    };
    sendEmail(mailOptions);
}

module.exports = {
    sendSignUpEmail
}