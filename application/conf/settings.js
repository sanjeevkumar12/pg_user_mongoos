console.log('Loading System Settings')

module.exports = {
    MONGO_URI : process.env.MONGO_URI,
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'TEST SECRET',
    LISTEN_PORT: process.env.LISTEN_PORT || 3000
}