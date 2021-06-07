var User = require('../models/users');
login_user = async (email, password) => {
    User.findByEmail(email, (error, user)=>  {
        if(user){
            user.comparePassword(password, (error, is_match)=> {
                if(is_match){
                    return {success: true, token : user.generateJWT()}
                }
            });
        }
    })
}

create_user = async (req) => {
    if (User.findByEmail({ email: req.body.email })) {
        throw {'error' : true, 'message' : 'This email is not available'}
    }
    var user = new User(req.validate_data || req.body);
    await user.save();
    return user
}

module.exports = {
    login_user,
    create_user
}