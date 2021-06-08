const {user_token_details} = require('../services/auth.service')
const AuthenticateMiddleware = () => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            let token_details = user_token_details(token).then((user) => {
                req.user = user
                next()
            }).catch(err => {next(err)})
        }else{
            return res.status(401).json({})
        }
    }
}
module.exports = {
    AuthenticateMiddleware
}