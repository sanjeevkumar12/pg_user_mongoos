const validationResult = require('express-validator');
const {User } = require('../models/users');
exports.register_user = async ( req, res) => {
    var user = new User(req.validate_data || req.body);
    await user.save((err, doc) => {
        if (err) {
            return res.status(422).json({errors:err})
        } else {
            const userData = {
                first_name: doc.first_name,
                last_name: doc.last_name,
                email: doc.email,
            }
            return res.status(200).json({
                success: true,
                message: 'Successfully Signed Up',
                userData
            })
        }
    });
}