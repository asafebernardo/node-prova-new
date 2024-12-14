const readline = require('readline');
const auth = require('./auth');
const index = require('./src2/index.js');
const products = require('./src2/product.js');
const categories = require('./src2/category.js');
const general = require('./src2/general.js');

// Configuração para entrada de dados
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Menu Principal
function mainMenu() {
  console.log("\n--- MENU PRINCIPAL ---");
  console.log("0 - Cadastrar usuário");
  console.log("1 - Login do usuário");
  console.log("2 - Fechar o programa");

  rl.question("Escolha uma opção: ", async (option) => {
    switch (option) {
      case '0':
        await auth.registerUser();
        mainMenu();
        break;
      case '1':
        const loggedIn = await auth.loginUser();
        if (loggedIn) subMenu();
        else mainMenu();
        break;
      case '2':
        console.log("Encerrando o programa...");
        rl.close();
        break;
      default:
        console.log("Opção inválida!");
        mainMenu();
    }
  });
}
/*
// Submenu para opções após o login
function subMenu() {
  console.log("\n--- MENU APÓS LOGIN ---");
  console.log("0 - Produtos");
  console.log("1 - Categorias");
  console.log("2 - Geral");
  console.log("3 - Sair (voltar para o menu principal)");

  rl.question("Escolha uma opção: ", (option) => {
    switch (option) {
      case '0':
        productsMenu();
        break;
      case '1':
        categoriesMenu();
        break;
      case '2':
        general.generalFunction();
        subMenu();
        break;
      case '3':
        mainMenu();
        break;
      default:
        console.log("Opção inválida!");
        subMenu();
    }
  });
}

// Menu de Produtos
function productsMenu() {
  console.log("\n--- MENU DE PRODUTOS ---");
  console.log("0 - Listar todos");
  console.log("1 - Listar um produto");
  console.log("2 - Inserir um produto");
  console.log("3 - Atualizar um produto");
  console.log("4 - Editar o produto");
  console.log("5 - Deletar um produto");
  console.log("6 - Voltar");

  rl.question("Escolha uma opção: ", async (option) => {
    switch (option) {
      case '0':
        await products.listAll();
        productsMenu();
        break;
      case '1':
        await products.listOne();
        productsMenu();
        break;
      case '2':
        await products.insert();
        productsMenu();
        break;
      case '3':
        await products.update();
        productsMenu();
        break;
      case '4':
        await products.edit();
        productsMenu();
        break;
      case '5':
        await products.delete();
        productsMenu();
        break;
      case '6':
        subMenu();
        break;
      default:
        console.log("Opção inválida!");
        productsMenu();
    }
  });
}

// Menu de Categorias
function categoriesMenu() {
  console.log("\n--- MENU DE CATEGORIAS ---");
  console.log("0 - Listar todas");
  console.log("1 - Listar uma categoria");
  console.log("2 - Inserir uma categoria");
  console.log("3 - Atualizar uma categoria");
  console.log("4 - Editar uma categoria");
  console.log("5 - Deletar uma categoria");
  console.log("6 - Voltar");

  rl.question("Escolha uma opção: ", async (option) => {
    switch (option) {
      case '0':
        await categories.listAll();
        categoriesMenu();
        break;
      case '1':
        await categories.listOne();
        categoriesMenu();
        break;
      case '2':
        await categories.insert();
        categoriesMenu();
        break;
      case '3':
        await categories.update();
        categoriesMenu();
        break;
      case '4':
        await categories.edit();
        categoriesMenu();
        break;
      case '5':
        await categories.delete();
        categoriesMenu();
        break;
      case '6':
        subMenu();
        break;
      default:
        console.log("Opção inválida!");
        categoriesMenu();
    }
  });
}
*/
// Iniciar o programa
mainMenu();
