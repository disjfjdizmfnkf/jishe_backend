const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

// 上传头像的中间件
const uploadAvatar = multer({
    dest: UPLOAD_PATH
})
const handleAvatar = uploadAvatar.single('avatar')

// 上传动态图片的中间件
const uploadMomentPhotos = multer({
    dest: UPLOAD_PATH
})
const handleMomentPhotos = uploadMomentPhotos.single('photo')


module.exports = {
    handleAvatar,
    handleMomentPhotos
}