const {User} = require('../models/users');
const {ValidationError, BadRequest} = require('../errors/throwable')
const {ADMIN_EMAIL_ADDRESS, DEFAULT_EMAIL_FROM_ADDRESS} = require('../conf/settings')
const {send_verification_mail, send_forgot_password_request_mail} = require('../helpers/emails/auth')

login_user = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(user){
        const isMatch = await user.comparePassword(req.body.password)
        if(isMatch){
            if(user.is_verified && user.is_active){
                return {token : user.generateJWT(), user : user}
            } else {
                if(!user.is_verified){
                    throw new BadRequest([{'account' : 'email_not_verified',
                        'message': 'Your email verification is not completed.'}])
                }
                else if(!user.is_active){
                    throw new BadRequest([{'account' : 'account_disabled',
                        'message': `Your account is disabled please contact administrator ${ADMIN_EMAIL_ADDRESS}.`}])
                }
            }
        }
    }
    throw new BadRequest([{'credential' : 'Please provide valid email/password'}])
}

create_user = async (req, res) => {
    const user_exists = await User.findOne({ email: req.body.email });
    if (user_exists) {
        throw new ValidationError([{'email' : 'This email is not available'}])
    }
    const user = new User(req.validate_data || req.body);
    await user.save();
    await send_verification_mail(user.email, 'DEFAULT_EMAIL_FROM_ADDRESS', 'Please verify your email address start using application.', {})
    return user
}

user_token_details = async (token) => {
    return await User.findByToken(token);
}


user_change_password = async (user, new_password) => {
    user.password = new_password
    await user.save()
    return user
}

user_verify_email_address = async (verify_token) => {
    user = await User.findByToken(verify_token)
    if(!user || user.is_verified===false){
        user.is_verified = true;
        await user.save()
        return user
    }
}

user_forgot_password_request = async (email) => {
    let user = await User.findByEmail(email)
    if (user){
        await send_forgot_password_request_mail(user.email, DEFAULT_EMAIL_FROM_ADDRESS,
            'Forgot password email request',{})

    }
}

user_verify_email = async (email) => {
    let user = await User.findByEmail(email)
    if (user){
        await send_forgot_password_request_mail(user.email, DEFAULT_EMAIL_FROM_ADDRESS,
            'Forgot password email request',{})

    }
}

module.exports = {
    login_user,
    create_user,
    user_token_details,
    user_change_password,
    user_verify_email_address
}
