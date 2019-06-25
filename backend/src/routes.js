const routes = require('express').Router()

// multer para permitir que o express entenda requisicoes com arquivos multipart (.jpg/.png/.txt etc)
const multer = require('multer')
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig)

const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')


routes.post('/posts', upload.single('image'), PostController.store)
routes.get('/posts', PostController.index)
routes.post('/posts/:id/like', LikeController.store)

module.exports = routes