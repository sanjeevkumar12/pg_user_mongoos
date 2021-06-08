const ejs = require('ejs');
const path = require('path');
const transport = require('../../core/email');
const config = require('../../conf/settings')


const get_template = (template_name) => {
    return path.join(config.EMAIL_TEMPLATE_DIR, template_name)
}

const send_verification_mail = async (to_email, from_email, subject, email_data) => {
    const html = await ejs.renderFile(get_template('auth/user.email.verify.ejs'), email_data, {async: true});
    const mailData = {from: 'youremail@gmail.com',
        to: to_email,
        subject: subject,
        text: '',
        html: html
    };
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