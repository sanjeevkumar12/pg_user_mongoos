var express = require('express');
var { register_user, login, token_details } = require('../controllers/auth_controller');
var { PostRequestMiddleware } = require('../middlewares/requests.middleware');
var { AuthenticateMiddleware } = require('../middlewares/authentication.middleware');
var {RegisterSchema, LoginSchema} = require('../requests/auth');
var router = express.Router();
router.post('/sign-up' , PostRequestMiddleware(RegisterSchema, 'body'), register_user);
router.post('/sign-in' , PostRequestMiddleware(LoginSchema, 'body'), login);
router.post('/me' , AuthenticateMiddleware(), token_details);
module.exports = router;
