require('dotenv').config();

/* Importação */
const express = require('express');
const mongoose = require('mongoose');

// Execução
const app = express();
const port = 3000;

// Entender dados em JSON
app.use(express.json());

// Requer o Modelo
const Category = require('../models/Category.js');

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


/* Código relacionado a Categoria (category) */
/* ---------------------------------------- */

// <GET> Category (listar todos as categorias existentes no DB)
app.get('/category/get', async (req, res) =>{
    try{
        const category = await Category.find();//Buscando todas as categorias
        res.status(200).json(
            {msg: 'Registros encontrados com sucesso!', category});
    } catch(error){
        res.status(500).json(
            {msg: 'Não foi possível realizar a consulta, tente novamente mais tarde!', error});
    }
})

// <GET> Listar uma categoria apenas por ID;
app.get('/category/get/:id', async (req, res) =>{
    try{
        const category = await Category.findById(req.params.id);//Buscar pelo ID
        
        if(!category){
            return res.status(404).json({ msg: "Categoria não encontrada"});
        }
        res.status(200).json(
            {msg: 'Registros encontrados com sucesso!', category});
    } catch(error){
        res.status(500).json(
            {msg: 'Não foi possível realizar a consulta, tente novamente mais tarde!', error});
    }
})

// <POST> Category (inserir categorias)
app.post('/category/post', async (req, res) => {

    const { name, description } = req.body;

    // Validações
    if (!name) {
        return res.status(422).json({ msg: "O Nome da categoria é obrigatório!" });
    }

    if (!description) {
        return res.status(422).json({ msg: "A Descrição é obrigatória" });
    }

    // Verificar se a categoria já existe
    const categoryExists = await Category.findOne({ name: name });

    if (categoryExists) {
        return res.status(422).json({ msg: "Esse nome de Categoria, já existe, utilize outro nome!" });
    }

    // Criar a Categoria com o código auto-incrementado
    const category = new Category({
        name,
        description
    });

    try {
        // Tenta salvar a categoria no banco
        await category.save();

        // Se salvar com sucesso, retorna a resposta
        res.status(201).json({
            msg: 'Categoria inserida com sucesso!',
            category: category // Retorna a categoria com o código gerado
        });
    } catch (error) {
        // Log do erro completo no console
        console.error("Erro ao inserir categoria:", error); // Aqui o erro será detalhado no console

        // Resposta com erro detalhado para o cliente
        res.status(500).json({
            msg: 'Um erro inesperado aconteceu, tente novamente mais tarde!',
            error: error.message // Retorna a mensagem do erro para facilitar o diagnóstico
        });
    }
});



// <UPDATE> Category (editar apenas 1 categoria)
app.put('/category/update/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const updateData = {...req.body };

    // Validar que apenas um campo foi enviado
    const fields = Object.keys(updateData);
    if (fields.length !== 1){
        return res.status(422).json({msg: 'Só é permitido alterar um campo pro vez!'})
    }

    // Validar se o campo é valido
    const allowedFields = ['name','description'];//Campos permitidos
    const fieldToUpdate = fields[0];// O campo é enviado

    if (!allowedFields.includes(fieldToUpdate)) {
        return res.status(422).json({ msg: `O campo "${fieldToUpdate}" não é permitido para atualização. Informe apenas 1 campo!` });
      }


    // Impedir edição do campo id
    if (updateData._id) {
        delete updateData._id;
      } 

    //Encontrando os campos
    const updateCategory = await Category.findByIdAndUpdate(
    id,
    { [fieldToUpdate]: updateData[fieldToUpdate] },//Atualizar apenas 1 campo
        {
        new: true, // Retorna o documento atualizado
        runValidators: true, // Aplica validações do esquema
        }
    );

    // Campo informado caso seja nulo ou ausente
    if (!updateCategory){
        return res.status(404).json({msg: 'Categoria não encontrada!'})
    }
    res.status(200).json({msg: 'Categoria atualizada com sucesso!', updateCategory});

    }catch (error){
        res.status(500).json({msg: 'Erro ao atualizar a Categoria!'})
    }
})

// <PUT> Atualizar todos os campos (put)
app.put('/category/put/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const updateData = req.body;

    // Impedir edição do campo id
    if (updateData._id) {
        delete updateData._id;
      } 

    //Encontrando os campos
    const updateCategory = await Category.findByIdAndUpdate(
    id, 
    updateData,
    {
        new: true, // Retorna o documento atualizado
        runValidators: true, // Aplica validações do esquema
        overwrite: true, // Garante a alteração completa de todos os campos
    });

    // Campo informado caso seja nulo ou ausente
    if (!updateCategory){
        return res.status(404).json({msg: 'Categoria não encontrada!'})
    }
    res.status(200).json({msg: 'Categoria atualizada com sucesso!', updateCategory});

    }catch (error){
        res.status(500).json({msg: 'Erro ao atualizar a Categoria!'})
    }
})

// <DELETE> Category (deletar a categoria)
app.delete('/category/delete/:id',async(req, res)=>{
    try{
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);//Remover apenas pelo ID
        // Caso o id informado seja nulo, retorna mensagem de erro!
        if(!deletedCategory){
            return res.status(404).json({msg: 'ID não informado!'});
        }
            res.status(200).json({msg: 'Categoria excluída com sucesso!'});
    }catch(error){
        res.status(500).json({msg: `Algo inesperado aconteceu, tente novamente mais tarde ${error.message}!`});
    }
})

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Server ON - Port  ${port}`);
});
