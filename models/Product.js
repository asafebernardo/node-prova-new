const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // campo obrigatório
        trim: true, // Tira os espaços na string
    },

    description: {
        type: String,
        required: false, // campo não obrigatório
        trim: true, // Tira os espaços na string
    },

    amount: {
        type: Number,
        required: true, // campo obrigatório
    },

    price: {
        type: Number,
        required: true, // campo obrigatório
    },

    id_categories: [
        {
          type: mongoose.Schema.Types.ObjectId, // Define como ObjectId
          ref: 'Category', // Faz referência ao modelo de categoria
        },
    ],
});

module.exports = mongoose.model('Product', productSchema);