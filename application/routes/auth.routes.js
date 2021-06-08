const express = require('express');
const { register_user, login, token_details } = require('../controllers/auth_controller');
const { PostRequestMiddleware } = require('../middlewares/requests.middleware');
const { AuthenticateMiddleware } = require('../middlewares/authentication.middleware');
const {RegisterSchema, LoginSchema} = require('../requests/auth');
const router = express.Router();
router.post('/sign-up' , PostRequestMiddleware(RegisterSchema, 'body'), register_user);
router.post('/sign-in' , PostRequestMiddleware(LoginSchema, 'body'), login);
router.post('/me' , AuthenticateMiddleware(), token_details);
module.exports = router;
