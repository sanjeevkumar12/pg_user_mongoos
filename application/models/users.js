const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../conf/settings')


const UserSchema = new Schema(
    {
        first_name : { type: String, required: true},
        last_name : { type : String, required: true},
        /*username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},*/
        email : {type: String, lowercase: true, required: [true, 'Email Cannot be blank'], index: { unique: true }},
        is_active : {type : Boolean, required: false , default :false},
        password : {type: String, required: true }
    },
    {
		timestamps:true
	}
)

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    return bcrypt.compareSync(candidatePassword, this.password);
};


UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, config.TOKEN_SECRET);
};

UserSchema.statics.findByToken = function (token, callBack) {
    var user = this;
    jwt.verify(token, config.TOKEN_SECRET, function (err, decode) {
    console.log(decode);
    user.findOne({ "_id": decode}, function (err, user) {
        if (err) return callBack(err);
            callBack(null, user);
        });
    });
};

UserSchema.statics.findByEmail = function (email, callBack) {
    var user = this;
    user.findOne({ "email": email}, function (err, user) {
    if (err) return callBack(err);
        callBack(null, user);
    });
};


const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}