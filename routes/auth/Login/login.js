const express = require("express");
const pool = require('../../../modules/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


const router = express()
router.use(cookieParser());



router.post('/login', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({success:false, error: 'É necessário fornecer um nome de usuário e senha.' });
    }

    try {
        const client = await pool.connect();
        const loginLowerCase = login.toLowerCase();

        const result = await client.query('SELECT * FROM users WHERE login = $1 OR email = $1', [loginLowerCase]);

        if (result.rows.length === 0) {
            client.release(); 
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            client.release();
            return res.status(401).json({success:false, error: 'Senha incorreta.' });
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        //res.cookie('token', token, { httpOnly: true }); 
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });


        client.release(); 
        return res.status(200).json({ success: true, message: 'Login bem-sucedido!', token });
        
    } catch (error) {
        return res.status(500).json({success:false, error: 'Erro interno do servidor.' });
    }
});


module.exports = router;