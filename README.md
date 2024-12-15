Idioma PT-BR;

**Como baixar o arquivo:**
1.  Clique no botão <> Code 
2.  Download Zip
3.  Descompacte o arquivo utilizando 7ZIP/Winrar na pasta a sua escolha;

**Como abrir no VScode**
1.  Acesse o VScode
2.  Clique no canto superior esquerdo em File
3.  Clique em Workspace from folder
4.  Selecione a pasta que salvou os arquivos baixado
5.  Abra o arquivo

**Para testar utilize o Postman;**
1. Acesse o Postman
2.  Clique no Menu (no canto superior esquerdo)
3.  Clique em File
4.  Selecione Import
5.  Selecione o arquivo (node-prova.postman_collection.json)
6.  Abra o arquivo

**Como testar?**
Primeiro deves realizar um comando de node no terminal dentro do workspace do VScode, para iniciar o projeto.
OBS: Para cada teste, é necessaário finalizar "CTRL+C", para acessar outro arquivo de rotas

**Para cada arquivo será feito da seguinte forma:**
node ./src/index.js
node ./src/category.js
node ./src/product.js
node ./src/general.js

Após o envio de alguma dos comandos acima, deverá retornar corretamente:
**Server ON - Port 3000**
**Data Base ON**

Após iniciar no VScode, será necessário testar a rota, através do Postman.
Selecione uma das pastas e preencha conforme cada requisição:

> **Pasta: 1. Cadastro de usuários**
VScode: Requer comando no terminal do VScode: "node ./src/index.js"

1. GET Public Route (Valida o funcionamento do servidor)
<br>Postman: Clique no Botão Send

2. POST /auth/register - Registrar o usuário
    <br>"username":"Bernardo1",//Preencha com o nome
    <br>"password":"Teste"//Preencha com a sua senha
<br>
- Postman: Clique no Botão Send
- Comentário: Serve para registrar o seu usuario
  
<br>Postman: Clique no Botão Send

> **Pasta: 2. Autenticação de usuário**
VScode: Requer comando no terminal do VScode: "node ./src/index.js"

1. /auth/login - Realizar o login
<br>"username":"Bernardo1",//Preencha com o nome para login
<br>"password":"Teste"//Preencha com a sua senha para login
<br>
- Postman: Clique no Botão Send
- Comentário: Serve para autenticar o seu usuario







