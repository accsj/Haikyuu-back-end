const express = require("express");
const pool = require('../../../modules/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express()

router.post('/register', async (req, res) => {
    const { login, email, password } = req.body;

    if (!login || !email || !password) {
        return res.status(400).json({success:false, error: 'É necessário fornecer um nome de usuário, email e senha.' });
    }

    try {
        
        const client = await pool.connect();
        const loginLowerCase = login.toLowerCase();
        const emailLowerCase = email.toLowerCase();

        const user = await client.query('SELECT * FROM users WHERE login = $1 OR email = $2', [loginLowerCase, emailLowerCase]);

        if (user.rows.length > 0) {
            client.release();
            return res.status(409).json({success:false, error: 'Nome de usuário ou email já está em uso.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query('INSERT INTO users (login, email, password) VALUES ($1, $2, $3) RETURNING id', [loginLowerCase, emailLowerCase, hashedPassword]);

        const userId = newUser.rows[0].id; 
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

        client.release();
        return res.status(201).json({success:true, message: 'Usuário registrado com sucesso!', token });

    } catch (error) {
        return res.status(500).json({success:false, error: 'Erro interno do servidor.' });
    }
});

module.exports = router;
