const {login_user, create_user} = require('../services/auth.service')
exports.register_user = async  ( req, res, next) => {
    return await create_user(req, res).then((user)=> res.json({user, success: true})).catch(err => next(err));
}
exports.login = async ( req, res, next) => {
    return await login_user(req, res).then((user)=> res.json(user)).catch(err => next(err));
}

exports.token_details = async ( req, res, next) => {
    return await login_user(req, res).then((user)=> res.json(user)).catch(err => next(err));
}