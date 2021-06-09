const auth_service = require('../services/auth.service')

exports.register_user = async  ( req, res, next) => {
    return await auth_service.create_user(req, res).then((user)=>{
        res.status(201).json({user, success: true})
    }).catch(err => next(err));
}
exports.login = async ( req, res, next) => {
    try{
        return await auth_service.login_user(req, res).then((user)=> res.json(user)).catch(err => next(err));
    }catch (e){
        return res.status(500).json({
            'error' : true,
            'message' : 'Something went wrong'
        })
    }

}

exports.token_details = async ( req, res, next) => {
    return res.json({user:req.user, success: true});
}

exports.change_password = async (req, res, next) => {
    return await auth_service.user_change_password(req.user, req.body.new_password)
}

exports.forgot_password_request = async (req, res, next) => {
    return await auth_service.user_change_password(req.user, req.body.new_password)
}


exports.forgot_password_request_confirm = async (req, res, next) => {
    return await auth_service.user_change_password(req.user, req.body.new_password)
}


exports.verify_email_address = async (req, res, next) => {
    return await auth_service.user_verify_email_address(req.params.verify_token)
}

