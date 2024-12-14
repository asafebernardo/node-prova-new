
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


// Função para validar se um ID é um ObjectId válido
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}


// <GET> Listar todos os produtos apenas, sem categorias
app.get('/product/get', async (req, res) => {
    try {
        // Consultar todos os produtos e excluir o campo 'id_categories' usando .select()
        const products = await Product.find()
            .select('-id_categories');  // Exclui o campo 'id_categories' da resposta

        res.status(200).json({
            msg: 'Produtos encontrados com sucesso!',
            products
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Erro ao realizar a consulta!',
            error
        });
    }
});

// <GET> Listar um produto especifico
app.get('/product/get/:id', async (req, res) =>{
    try {
        // Buscar o produto especifico com categoria
        const products = await Product.findById(req.params.id).populate('id_categories');
        // O id_categories, receberá os dados da categoria

        if (!products){
            return res.status(404).json({msg: 'Produto não encontrado por esse ID!'})
        };

        res.status(200).json({msg :'Consulta realizada com sucesso!', products: products});
    
    } catch (error){
        res.status(500).json({msg: 'Erro ao realizar a consulta!'})
    }
});

// <POST> Inserir um produto
app.post('/product/post', async (req, res) => {
  const { name, description, amount, price, id_categories } = req.body;

  // Validações
  if (!name) {
    return res.status(422).json({ msg: 'O nome do produto é obrigatório!' });
  }
  if (!amount) {
    return res.status(422).json({ msg: 'A quantidade do produto não pode ser nula!' });
  }
  if (!price) {
    return res.status(422).json({ msg: 'O preço do produto não pode ser nulo!' });
  }

  let validCategoryIds = [];
  if (id_categories && id_categories.length > 0) {
    if (!Array.isArray(id_categories)) {
      return res.status(422).json({ msg: 'As categorias devem ser uma lista de IDs válidos!' });
    }

    // Validar se os IDs de categoria são válidos
    const invalidCategoryIds = id_categories.filter((id) => !isValidObjectId(id));
    if (invalidCategoryIds.length > 0) {
      return res.status(422).json({ msg: `Os seguintes IDs de categoria são inválidos: ${invalidCategoryIds.join(', ')}` });
    }

    // Validar se todas as categorias existem no banco
    const validCategories = await Category.find({ _id: { $in: id_categories } });
    if (validCategories.length !== id_categories.length) {
      return res.status(404).json({ msg: 'Uma ou mais categorias informadas não foram encontradas.' });
    }

    // Obter apenas os IDs válidos
    validCategoryIds = validCategories.map((category) => category._id);
  }

  const product = new Product({
    name,
    description,
    amount,
    price,
    id_categories: validCategoryIds, // Atribuir os IDs válidos como um array
  });

  try {
    await product.save();
    res.status(200).json({ msg: 'Produto criado com sucesso!', product });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao criar o produto.', error: error.message });
  }
});

// <UPDATE> Atualizar o Produto
app.put('/product/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Verificar se apenas um campo foi enviado
        const fields = Object.keys(updateData);

        // Se mais de um campo foi editado - erro
        if (fields.length !== 1) {
            return res.status(422).json({ msg: 'Só é permitido alterar um campo por vez!' });
        }

        // Verificar se o campo é válido
        const allowedFields = ['name', 'description', 'amount', 'price', 'id_categories']; // Campos permitidos para edição
        const fieldToUpdate = fields[0]; // O campo enviado array 0

        // Apenas os campos que podem ser alterados
        if (!allowedFields.includes(fieldToUpdate)) {
            return res.status(422).json({ msg: `O campo "${fieldToUpdate}" não é permitido para atualização.` });
        }

        // Atualizar o produto no banco de dados
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { [fieldToUpdate]: updateData[fieldToUpdate] },
            { new: true, runValidators: true }
            // Retornar o documento atualizado e aplicar validações
        );

        // Se o produto for nulo = erro
        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Produto não encontrado!' });
        }

        // Se der certo = sucesso
        res.status(200).json({
            msg: 'Produto atualizado com sucesso!',
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar o produto!'});
    }
});

// <PUT> Editar o Produto
app.put('/product/put/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Impedir a alteração do campo _id
        if (updateData._id) {
            delete updateData._id;
        }

        // Atualizar todos os campos do produto
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true, overwrite: true } // Atualizar todos os campos
        );

        // Verificar se o produto foi encontrado
        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Produto com esse ID não encontrado!' });
        }

        res.status(200).json({
            msg: 'Produto editado com sucesso!',
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar o produto!'});
    }
});

// <DELETE> Deletar um produto específico
app.delete('/product/delete/:id', async (req, res) => {
    try {
        // Buscar o produto pelo ID
        const product = await Product.findByIdAndDelete(req.params.id);

        // Verificar se o produto foi encontrado
        if (!product) {
            return res.status(404).json({ msg: 'ID desse produto não foi encontrado!' });
        }

        res.status(200).json({
            msg: 'Produto excluido com sucesso!',
        });
    
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao realizar a exclusão do produto!' });
    }
});


// Inicialização do servidor
app.listen(port, () => {
  console.log(`Server ON - Port ${port}`);
});
