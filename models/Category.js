const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Impede categorias com o mesmo nome
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Opcional: adiciona os campos createdAt e updatedAt
});

module.exports = mongoose.model('Category', categorySchema);
