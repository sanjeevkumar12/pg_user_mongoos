const Joi = require('joi'); 
const PostRequestMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property]); 
    const valid = error == null;
    req.validate_data = {}
    if (valid) {
      req.validate_data = value
      next(); } 
    else { 
      const messages = error.details.map(item => { 
        const error_d = {};
        error_d[item.path[0]] = item.message;
        return error_d;
      })
      res.status(422).json({ error: messages }) 
    } 
  } 
} 
module.exports = {
    PostRequestMiddleware
}