require('dotenv').config();

/* Importação */
const express = require('express');
const mongoose = require('mongoose');

// Execução
const app = express();
const port = 3000;

// Entender dados em JSON
app.use(express.json());

// Requer o Modelo de Product e Category
const Category = require('../models/Category.js');
const Product = require('../models/Product.js');

// user do banco de dados
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Conexão MongoDB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@node-prova.drsog.mongodb.net/?retryWrites=true&w=majority&appName=node-prova`,
  )
  .then(() => console.log('Data Base ON'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// <GET> Listar todos os produtos com suas categorias
app.get('/general/get', async (req, res) =>{
    try {
        // Buscar todos os produtos e inclusive os associados as categorias
        const products = await Product.find().populate('id_categories');
        // O id_categories, receberá os dados da categoria

        res.status(200).json({msg :'Consulta realizada com sucesso!', products: products});
    
    } catch (error){
        res.status(500).json({msg: 'Erro ao realizar a consulta!'})
    }
});


// <GET> Listar todos os produtos de uma categoria (origem produtos)
app.get('/general/products/category/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Buscar produtos que possuem a categoria específica
        const products = await Product.find({ id_categories: categoryId }).populate('id_categories'); // Populate para trazer os dados da categoria associada

        if (products.length === 0) {
            return res.status(404).json({ msg: 'Nenhum produto encontrado para esta categoria!' });
        }

        res.status(200).json({
            msg: 'Produtos encontrados com sucesso!',
            products
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Erro ao consultar produtos por categoria',
            error: error.message
        });
    }
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Server ON - Port ${port}`);
  });