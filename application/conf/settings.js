console.log('Loading System Settings');
const path = require('path');

module.exports = {
    MONGO_URI : process.env.MONGO_URI,
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'TEST SECRET',
    LISTEN_PORT: process.env.LISTEN_PORT || 3000,
    ADMIN_EMAIL_ADDRESS: process.env.ADMIN_EMAIL_ADDRESS || 'admin@example.com',
    SMTP_EMAIL_HOST:process.env.SMTP_EMAIL_HOST,
    SMTP_EMAIL_USERNAME:process.env.SMTP_EMAIL_USERNAME,
    SMTP_EMAIL_PASSWORD:process.env.SMTP_EMAIL_PASSWORD,
    SMTP_EMAIL_PORT:process.env.SMTP_EMAIL_PORT,
    DEFAULT_EMAIL_FROM_ADDRESS: 'adminfrom@testapp.com',
    EMAIL_TEMPLATE_DIR : path.join(path.dirname(path.dirname(__dirname)),'views','emails')
}