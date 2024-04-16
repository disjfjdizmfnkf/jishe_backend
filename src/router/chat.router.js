const KoaRouter = require('@koa/router')
const {askToChatGpt} = require("../controller/chatGpt.controller");

const chatRouter = new KoaRouter()

// AI聊天接口
chatRouter.post('/chatbot', askToChatGpt);

module.exports = chatRouter