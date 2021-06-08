const {User} = require('../models/users');
const {ValidationError, BadRequest} = require('../errors/throwable')
const {ADMIN_EMAIL_ADDRESS} = require('../conf/settings')

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
    return user
}

user_token_details = async (token) => {
    return await User.findByToken(token);
}

module.exports = {
    login_user,
    create_user,
    user_token_details
}