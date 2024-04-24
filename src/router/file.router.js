const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const {handleAvatar, handleMomentPhotos} = require('../middleware/file.middleware');
const { createAvatar, creatMomentPhotos } = require('../controller/file.controller')

const fileRouter = new KoaRouter({prefix: '/file'})

// file/avatar => 上传头像
fileRouter.post('/avatar', verifyAuth, handleAvatar, createAvatar)

// file/momentPhoto 上传动态图片
fileRouter.post('/momentPhoto/:momentId', verifyAuth, handleMomentPhotos, creatMomentPhotos)

module.exports = fileRouter