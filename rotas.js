const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('./conexao');

// Rota de cadastro
router.post('/cadastro', (req, res) => {
    const { email, senha } = req.body;

    // Criptografa a senha
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) return res.json({ success: false, message: 'Erro ao criptografar a senha.' });

        // Insere o usuário no banco de dados
        const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
        connection.query(sql, [email, hash], (err) => {
            if (err) return res.json({ success: false, message: 'Erro ao cadastrar usuário.' });
            return res.json({ success: true });
        });
    });
});

// Rota de login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Verifica o usuário no banco de dados
    const sql = 'SELECT senha FROM usuarios WHERE email = ?';
    connection.query(sql, [email], (err, results) => {
        if (err) return res.json({ success: false, message: 'Erro na consulta.' });

        if (results.length > 0) {
            // Compara a senha fornecida com o hash armazenado
            bcrypt.compare(senha, results[0].senha, (err, result) => {
                if (result) {
                    return res.json({ success: true });
                } else {
                    return res.json({ success: false, message: 'Senha incorreta.' });
                }
            });
        } else {
            return res.json({ success: false, message: 'Usuário não encontrado.' });
        }
    });
});

module.exports = router;
