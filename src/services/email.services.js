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

async function sendEmail(emailOptions) {
		try {
				let emailTransporter = await createTransporter();
				await emailTransporter.sendMail(emailOptions);
		return true;
		} catch(exception) {
				return false;
		}
};


async function sendSignUpEmail(userEmail, userName) {
		var mailOptions = {
				from: process.env.NODEMAILER_EMAIL,
				to: userEmail,
				subject: "Solicitud de registro de Padel play",
				text: `Hola ${userName}:\n\nSu solicitud de registro para el club deportivo Padel play se está tramitando lo más rápido posible. Le avisaremos en cuanto se apruebe.\n\nUn saludo,\n\nPadel play.`
		};
		return await sendEmail(mailOptions);
}


async function sendAcceptRegistrationRequest(userEmail, userName) {
		var mailOptions = {
				from: process.env.NODEMAILER_EMAIL,
				to: userEmail,
				subject: "Solicitud de registro de Padel play aprobada",
				text: `Hola ${userName}:\n\nSu solicitud de registro para el club deportivo Padel play ha sido aceptada. Bienvenido al centro deportivo.\n\nUn saludo,\n\nPadel play.`
		}
		return await sendEmail(mailOptions);
}

async function sendRejectRegistrationRequest(userEmail, userName) {
	var mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: userEmail,
		subject: "Solicitud de registro de Padel play denegada",
		text: `Hola ${userName}:\n\nSu solicitud de registro para el club deportivo Padel play ha sido denegada. Para más información contacta con el administrador del centro deportivo.\n\nUn saludo,\n\nPadel play.`
	}
	return await sendEmail(mailOptions);
}

async function sendRestorePassword(userEmail, userName, newPassword) {
		var mailOptions = {
				from: process.env.NODEMAILER_EMAIL,
				to: userEmail,
				subject: "Restablecimiento de contraseña Padel Play",
				text: `Hola ${userName}:\n\nSu nueva contraseña es la siguiente: ${newPassword}\n\nEs recomendable que sea cambiada.\n\nUn saludo,\n\nPadel play.`
		}
		return await sendEmail(mailOptions);
}

async function sendRestorePasswordLink(userEmail, userName, link) {
	var mailOptions = {
				from: process.env.NODEMAILER_EMAIL,
				to: userEmail,
				subject: "Restablecimiento de contraseña Padel Play",
				text: `Hola ${userName}:\n\nEntre en el siguiente link para restablecer su contraseña:\n ${link}\n\nUn saludo,\n\nPadel play.`
		}
		return await sendEmail(mailOptions);
}

async function sendChangedPasswordConfirmation(userEmail, userName) {
	var mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: userEmail,
		subject: "Restablecimiento de contraseña Padel Play",
		text: `Hola ${userName}:\n\nSu contraseña ha sido restablecida con éxito.\n\nUn saludo,\n\nPadel play.`
}
	return await sendEmail(mailOptions);
}

async function sendBookingConfirmationMail(userEmail, userName, day, startTime, finishTime, courtName, withLight, amountToPay) {
	var withLightMessage = "con luz";
	if (!withLight) {
		withLightMessage = "sin luz";
	}
	var mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: userEmail,
		subject: "Confirmación de reserva Padel Play",
		text: `Hola ${userName}:\n\nHas realizado una reserva con los siguientes detalles:\n
		- Día: ${day} \n
		- De: ${startTime} - ${finishTime}\n
		- Pista: ${courtName}\n
		- ${withLightMessage}\n
		- ${amountToPay} €
		\n\nUn saludo,\n\nPadel play.`
	}
	return await sendEmail(mailOptions);
}



module.exports = {
	sendSignUpEmail,
	sendAcceptRegistrationRequest,
	sendRejectRegistrationRequest,
	sendRestorePassword,
	sendRestorePasswordLink,
	sendChangedPasswordConfirmation,
	sendBookingConfirmationMail,
}