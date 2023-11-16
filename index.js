//Importação das bibliotecas necessárias
const express = require('express');
const cors = require('cors');

//Declarando a função do express como variável
const app = express();

//Definição da porta do servidor
const port = 3000;

// Configurações do Express
app.use(express.json());

// Configuração do CORS
app.use(cors());

//Teste de conexão da porta pelo postman/thunderclient e console
app.get('/', (req, res) => {
  res.send('Bem-vindo a Hogwarts!');
});

//------------------------------------------//

// Criando um array de clientes
let clientes = [
    { id: 1, nome: "Harry Potter", contato:999999 , endereco:"Rua dos Alfeneiros"},
    { id: 2, nome: "Sirius Black", contato: 888888, endereco:"Rua da Cabana"},
];

// Rota para listar todos os clientes
app.get("/clientes", (req, res) => {
    console.log("get");
    // Retorna uma lista de clientes
    res.json(clientes);
});
// Rota para obter um cliente por ID
app.get("/clientes/:id", (req, res) => {
    // Obtém o ID do cliente
    const id = parseInt(req.params.id);
    // Procura o cliente no array
    const cliente = clientes.find((cliente) => cliente.id === id);
    // Retorna o cliente encontrado ou um erro
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ message: "Cliente não encontrado" });
    }
});

// Rota para adicionar um novo cliente
app.post("/cliente", (req, res) => {
    // Obtém os dados do cliente
    const newCliente = req.body;
    // Adiciona o cliente ao array
    clientes.push(newCliente);
    // Retorna o novo cliente
    res.status(201).json(newCliente);
});

// Rota para atualizar um cliente
app.put("/cliente/:id", (req, res) => {
    // Obtém o ID do cliente
    const id = parseInt(req.params.id);
    // Obtém os dados do cliente
    const updateCliente = req.body;
    // Procura o cliente no array
    const index = clientes.findIndex((cliente) => cliente.id === id);
    // Atualiza o cliente encontrado ou retorna um erro
    if (index !== -1) {
        clientes[index] = { ...clientes[index], ...updateCliente };
        res.json(clientes[index]);
    } else {
        res.status(404).json({ message: "Cliente não encontrado" });
    }
});

// Rota para remover um cliente
app.delete("/clientes/:id", (req, res) => {
    // Obtém o ID do cliente
    const id = parseInt(req.params.id);
    // Procura o cliente no array
    const index = clientes.findIndex((cliente) => cliente.id === id);
    // Remove o cliente encontrado ou retorna um erro
    if (index !== -1) {
        const removeCliente = clientes.splice(index, 1);
        res.json(removeCliente[0]);
    } else {
        res.status(404).json({ message: "Cliente não encontrado" });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
