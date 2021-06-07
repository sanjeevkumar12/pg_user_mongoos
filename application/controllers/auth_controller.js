const {login_user, create_user} = require('../services/auth.service')
exports.register_user = ( req, res) => {
    return create_user(req).then(user=> user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
}
exports.login = ( req, res) => {
    return login_user(req, res).then((user, error)=>{
        if(user){

        }
    });
}