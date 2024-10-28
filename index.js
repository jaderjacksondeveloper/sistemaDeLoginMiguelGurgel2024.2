const express = require('express');
const app = express();
const rotas = require('./rotas');
const path = require('path');

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Servindo arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '..', 'views')));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));

// Usando as rotas definidas
app.use(rotas);

// Iniciando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
