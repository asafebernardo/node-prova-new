# Projeto Node-Prova

## Como baixar o arquivo:
1. Clique no botão **<> Code**.
2. Selecione **Download ZIP**.
3. Descompacte o arquivo utilizando o 7ZIP ou WinRAR em uma pasta de sua escolha.

## Como abrir no VS Code:
1. Acesse o VS Code.
2. No canto superior esquerdo, clique em **File**.
3. Selecione **Open Folder**.
4. Escolha a pasta onde você descompactou o arquivo.
5. Abra o arquivo.

## Para testar utilizando o Postman:
1. Abra o Postman.
2. Clique no Menu (canto superior esquerdo).
3. Selecione **File**.
4. Escolha **Import**.
5. Selecione o arquivo **node-prova.postman_collection.json**.
6. Abra o arquivo.
7. Para realizar as requisições clique em SEND.

# Documentação das Requisições da API

Este documento descreve as requisições disponíveis na API conforme configurado no arquivo Postman.

## Variáveis Globais
- **host**: `http://localhost:3000`
- **token**: Token JWT usado para autenticação de rotas protegidas.

---

## 1. Cadastro de Usuários

### Public Route (Valida o funcionamento do Servidor)
**Método:** GET  
**Endpoint:** `/`  
**Descrição:** Testa o funcionamento do servidor público.

---

### /auth/register - Registrar o usuário
**Método:** POST  
**Endpoint:** `/auth/register`  
**Descrição:** Registra um novo usuário.
**Body:**
```json
{
    "username": "Bernardo2",
    "password": "Teste"
}
```

---

## 2. Autenticação de Usuário

### /auth/login - Realizar o Login
**Método:** POST  
**Endpoint:** `/auth/login`  
**Descrição:** Realiza o login do usuário.
**Body:**
```json
{
    "username": "Asafe",
    "password": "Teste"
}
```

---

### /user/:id - Rota Privada - Validar o login
**Método:** GET  
**Endpoint:** `/user/:id`  
**Descrição:** Retorna dados do usuário autenticado.
**Autenticação:** Bearer Token  
**Exemplo de URL:** `/user/675cee787207036ee529fbea`

---

## 3. Gestão de Categorias

### Listar todas categorias
**Método:** GET  
**Endpoint:** `/category/get`  
**Descrição:** Retorna todas as categorias cadastradas.

---

### Listar uma categoria
**Método:** GET  
**Endpoint:** `/category/get/:id`  
**Descrição:** Retorna os detalhes de uma categoria específica.  
**Exemplo de URL:** `/category/get/675d0a545d3698d65c9fed51`

---

### Inserir uma categoria
**Método:** POST  
**Endpoint:** `/category/post`  
**Descrição:** Insere uma nova categoria.
**Body:**
```json
{
    "name": "Categoria 02",
    "description": "Teste 123"
}
```

---

### Atualizar a categoria
**Método:** PUT  
**Endpoint:** `/category/update/:id`  
**Descrição:** Atualiza uma categoria existente.
**Body:**
```json
{
    "description": "Teste"
}
```
**Exemplo de URL:** `/category/update/675d0a545d3698d65c9fed52`

---

### Editar a categoria
**Método:** PUT  
**Endpoint:** `/category/put/:id`  
**Descrição:** Edita uma categoria existente.
**Body:**
```json
{
    "name": "Gamer",
    "description": "Mouse Gamer"
}
```
**Exemplo de URL:** `/category/put/675d0a545d3698d65c9fed52`

---

### Deletar uma categoria
**Método:** DELETE  
**Endpoint:** `/category/delete/:id`  
**Descrição:** Deleta uma categoria existente.  
**Exemplo de URL:** `/category/delete/675d0a545d3698d65c9fed52`

---

## 4. Gestão de Produtos

### Listar todos os produtos
**Método:** GET  
**Endpoint:** `/product/get`  
**Descrição:** Retorna todos os produtos cadastrados.

---

### Listar um produto
**Método:** GET  
**Endpoint:** `/product/get/:id`  
**Descrição:** Retorna os detalhes de um produto específico.  
**Exemplo de URL:** `/product/get/675e0c95b7281b2027c9301a`

---

### Inserir um produto (pendente)
**Método:** POST  
**Endpoint:** `/product/post`  
**Descrição:** Insere um novo produto.
**Body:**
```json
{
  "name": "Produto Exemplo",
  "description": "Descrição do produto",
  "amount": 10,
  "price": 99.99,
  "id_categories": [
    "675de2cd481122dda8263c9b",
    "675de2ca481122dda8263c98",
    "675de90959b1a64f738715da"
  ]
}
```

---

### Atualizar um produto
**Método:** PUT  
**Endpoint:** `/product/update/:id`  
**Descrição:** Atualiza um produto existente.
**Body:**
```json
{
    "id_categories": [
        "675de2ca481122dda8263c98","675de2cd481122dda8263c9b"
    ]
}
```
**Exemplo de URL:** `/product/update/675e0c95b7281b2027c9301a`

---

### Editar um produto
**Método:** PUT  
**Endpoint:** `/product/put/:id`  
**Descrição:** Edita um produto existente.
**Body:**
```json
{
        "_id": "675e0c95b7281b2027c9301a",
        "name": "Produto Exemplo",
        "description": "Descrição do produto",
        "amount": 10,
        "price": 99.99,
        "id_categories": [
            "675de2ca481122dda8263c98",
            "675de2cd481122dda8263c9b",
            "675de90959b1a64f738715da"
        ]
}
```
**Exemplo de URL:** `/product/put/675dde2d38b46a34a4b98f90`

---

### Deletar um produto
**Método:** DELETE  
**Endpoint:** `/product/delete/:id`  
**Descrição:** Deleta um produto existente.  
**Exemplo de URL:** `/product/delete/675dddbe38b46a34a4b98f8c`

---

## 5. Consulta de dados gerais

### Listar os produtos de uma categoria
**Método:** GET  
**Endpoint:** `/general/products/category/:id`  
**Descrição:** Retorna os produtos vinculados a uma categoria específica.  
**Exemplo de URL:** `/general/products/category/675d0a5e5d3698d65c9fed56`

---

### Listar todos os produtos com suas categorias
**Método:** GET  
**Endpoint:** `/general/get`  
**Descrição:** Retorna todos os produtos com as respectivas categorias.

