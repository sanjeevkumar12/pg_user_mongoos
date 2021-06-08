const GeneralError = require('./throwable');

const handleErrors = (err, req, res, next) => {
    if (err.name === 'GeneralError') {
        return res.status(err.getCode()).json(err.getResponseData());
    }
    return res.status(500).json({
        status: 'error',
        message: err.message
    });
}


module.exports = handleErrors;