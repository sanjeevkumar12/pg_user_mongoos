var express = require('express');
var { register_user } = require('../controllers/auth_controller');
var { PostRequestMiddleware } = require('../middlewares/requests');
var {RegisterSchema} = require('../requests/auth');
var router = express.Router();
router.post('/sign-up' , PostRequestMiddleware(RegisterSchema, 'body'), register_user);
module.exports = router;
