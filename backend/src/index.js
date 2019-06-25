const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express();

// real time = usuarios recebem as atualizacoes em tempo real
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json())

// conexap com banco mongoDB
mongoose.connect('mongodb://localhost:27017/instagranPosts', { useNewUrlParser: true })

// permitindo o realtime em todas as rotas 
app.use((req, res, next) => {
  req.io = io
  next()
})

// usando cors para a aplicacao ser acessivel de outros enderecos ips, servidores etc
app.use(cors())

// rota para acessar as imagens atraves da url/files 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'rezised')))


app.use(require('./routes'))

server.listen(3001)