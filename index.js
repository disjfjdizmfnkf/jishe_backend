const express = require('express');
const cors = require('cors');
const {askToChatGpt} = require("./chatGpt.controller");

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chatbot', askToChatGpt);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务运行 端口 ${PORT}`);
});