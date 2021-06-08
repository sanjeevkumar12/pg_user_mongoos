const transport = require('../../core/email');
const pug = require('ejs');

const send_verification_mail = (to_email, from_email, subject, email_data) => {
    const mailData = {from: 'youremail@gmail.com',
        to: to_email,
        subject: subject,
        text: '',
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };
    pug.renderFile('../view')
     transport.sendMail(mailData, (err, info) => {
        if(err){
            console.log(err);
        }
        console.log("Info: ", info);
    });

}

module.exports = {
    send_verification_mail
}