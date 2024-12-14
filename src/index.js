require('dotenv').config();

/* Importação */
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Execução
const app = express();
const port = 3000;

// Entender dados em json
app.use(express.json());

// Requer o Modelo
const User = require('../models/User.js');
const { applyTimestamps } = require('../models/User.js');

// user do banco de dados
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Conexão MongoDB
mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@node-prova.drsog.mongodb.net/?retryWrites=true&w=majority&appName=node-prova`
);

// Middleware para validar ObjectId
function validateObjectId(req, res, next) {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido! O ID deve ter 24 caracteres e formato hexadecimal.' });
    }

    next(); // Prossegue se o ID for válido
}

// Rota GET  para Servidor
app.get('/', (req, res) => {
    res.send('Ligado');
});

// Rota privada
app.get('/user/:id', checkToken, validateObjectId, async (req, res) => {
    const id = req.params.id;

    // Validar se o usuário existe
    const username = await User.findById(id, '-password');

    // Se o valor de username do banco for diferente do informado retorna erro
    if (!username) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Caso dê certo, retorna o sucesso
    res.status(200).json({ username });
});

// Checagem de token
function checkToken(req, res, next) {
    // Pegar o valor do cabeçalho
    const authHeader = req.headers['authorization'];
    // Pegar o valor do token - Pegar a primeira parte do array
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);

        next();
    } catch (error) {
        return res.status(400).json({ msg: 'Token inválido!' });
    }
}

// Rota pública
// Registrar username
app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;

    // Validações

    // O Username não pode ser nulo
    if (!username) {
        return res.status(422).json({ msg: 'O nome do usuário é obrigatório' });
    }

    // A senha não pode ser nula
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' });
    }

    // Validar se o username existe
    const userExists = await User.findOne({ username: username });

    // Se existir esse usuário, retornar uma mensagem
    if (userExists) {
        return res.status(422).json({ msg: 'Esse usuário já existe, utilize outro usuário!' });
    }

    // Criar a senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criar o usuário
    const user = new User({
        username,
        password: passwordHash,
    });

    // Salvar usuário no banco de dados
    try {
        await user.save();

        res.status(201).json({
            msg: 'Usuário criado com sucesso!',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Um erro inesperado aconteceu, tente novamente mais tarde!',
        });
    }
});

// Autenticacao de login
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // O Username não pode ser nulo
    if (!username) {
        return res.status(422).json({ msg: 'O nome do usuário é obrigatório' });
    }

    // A senha não pode ser nula
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatória' });
    }

    // Validar se o username existe
    const user = await User.findOne({ username: username });

    // Se existir esse usuário, retornar uma mensagem
    if (!user) {
        return res.status(422).json({ msg: 'Usuário não encontrado!' });
    }

    // Validar se a senha existe
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(404).json({ msg: 'Senha inválida' });
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        );

        res.status(200).json({ msg: 'Autenticacao realizado com sucesso!', token });
    } catch (error) {
        res.status(500).json({
            msg: 'Um erro inesperado aconteceu, tente novamente mais tarde!',
        });
    }
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Conectado com o Banco de dados ${port}`);
});
