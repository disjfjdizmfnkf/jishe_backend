const multer = require('@koa/multer')
const {UPLOAD_PATH} = require("../config/path");


// 上传头像的中间件
const uploadAvatar = multer({  //存放路径
    dest: UPLOAD_PATH
})
const handleAvatar = uploadAvatar.single('avatar')  //处理名为avatar的文件的上传


module.exports = {
    handleAvatar
}