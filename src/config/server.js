const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    CHAT_PROMPT,
    API_KEY,
    SECRET_KEY,
    SERVER_PORT,
    SERVER_HOST,
} = process.env