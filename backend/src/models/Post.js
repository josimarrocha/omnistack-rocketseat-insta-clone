const mongoose = require('mongoose')

// tabela do banco de dados em formato javascript
const PostSchema = new mongoose.Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0
  }
},
  {
    // cria dois campos no banco com a data de criacao do registro 'createdAt' 
    // e data da atualização do registro 'updatedAt'
    timestamps: true
  }
)

module.exports = mongoose.model('Post', PostSchema)
