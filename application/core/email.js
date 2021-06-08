const nodemailer = require('nodemailer');
const config = require('../conf/settings')
const transporter = nodemailer.createTransport({
    port: config.SMTP_EMAIL_PORT,
    host: config.SMTP_EMAIL_HOST,
    auth: {
        user: config.SMTP_EMAIL_USERNAME,
        pass: config.SMTP_EMAIL_PASSWORD,
    },
    secure: false,
});


module.exports = transporter


