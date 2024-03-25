const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const getAccessToken = async () => {
    const response = await axios.get(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`);
    return response.data.access_token;
};

const askToChatGpt = async function (req, res) {
    try {
        const accessToken = await getAccessToken();
        const resp = await axios.post(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${accessToken}`, {
            messages: [
                {
                    role: 'user',
                    content: req.body.message,
                },
            ],
        });
        res.send({ from: "chatGpt", data: resp.data.result });
    } catch (error) {
        console.log("Error ", error);
    }
};

module.exports = {
    askToChatGpt,
};