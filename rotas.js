const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('./conexao');

// Rota de cadastro
router.post('/cadastro', (req, res) => {
    const { username, senha } = req.body;

    // Verifica se os campos estão preenchidos
    if (!username || !senha) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    // Criptografa a senha
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            return res.status(500).json({ success: false, message: 'Erro interno ao processar a solicitação.' });
        }

        // Insere o usuário no banco de dados
        const sql = 'INSERT INTO usuarios (username, senha) VALUES (?, ?)';
        connection.query(sql, [username, hash], (err) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ success: false, message: 'Nome de usuário já existe.' });
                }
                return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário.' });
            }
            return res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso!' });
        });
    });
});

// Rota de login
router.post('/login', (req, res) => {
    const { username, senha } = req.body;

    // Verifica se os campos estão preenchidos
    if (!username || !senha) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    // Verifica o usuário no banco de dados
    const sql = 'SELECT senha FROM usuarios WHERE username = ?';
    connection.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Erro na consulta ao banco de dados:', err);
            return res.status(500).json({ success: false, message: 'Erro interno ao processar a solicitação.' });
        }

        if (results.length > 0) {
            // Compara a senha fornecida com o hash armazenado
            bcrypt.compare(senha, results[0].senha, (err, result) => {
                if (err) {
                    console.error('Erro ao comparar as senhas:', err);
                    return res.status(500).json({ success: false, message: 'Erro interno ao processar a solicitação.' });
                }

                if (result) {
                    return res.status(200).json({ success: true, message: 'Login realizado com sucesso!' });
                } else {
                    return res.status(401).json({ success: false, message: 'Senha incorreta.' });
                }
            });
        } else {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }
    });
});

module.exports = router;
