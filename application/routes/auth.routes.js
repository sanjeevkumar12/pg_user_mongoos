var express = require('express');
var { register_user, login } = require('../controllers/auth_controller');
var { PostRequestMiddleware } = require('../middlewares/requests');
var {RegisterSchema, LoginSchema} = require('../requests/auth');
var router = express.Router();
router.post('/sign-up' , PostRequestMiddleware(RegisterSchema, 'body'), register_user);
router.post('/sign-in' , PostRequestMiddleware(LoginSchema, 'body'), login);
module.exports = router;
