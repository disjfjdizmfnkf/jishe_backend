const axios = require('axios');
const { API_KEY, SECRET_KEY, PROMPT} = require('../config/server')


const getAccessToken = async () => {
    const response = await axios.get(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`);
    return response.data.access_token;
};

const askToChatGpt = async function (ctx) {
    try {
        const accessToken = await getAccessToken();
        const resp = await axios.post(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${accessToken}`, {
            messages: [
                {
                    role: 'user',
                    content: ctx.request.body.message,
                },
            ],
            system: PROMPT, //使用自己定义的prompt
            // stream: true, //以流式接口的形式返回数据
        });
        // 响应体内容 koa会自动设置响应头
        console.log(resp)  //看下开发api调用到期没，每天次数够不够。。。
        ctx.body = { from: "chatGpt", data: resp.data.result };
    } catch (error) {
        console.log("Error ", error);
    }
};

module.exports = {
    askToChatGpt,
};