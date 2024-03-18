const express = require("express");
const pool = require('../../../modules/db.js');
const bcrypt = require("bcrypt");
const router = express();


router.post('/password-recovery', async (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;
    
    try {
        const client = await pool.connect();
        const authClientToken = await client.query('Select token from users');
        const authClientDate = await client.query('select expiration_time from users');

        if (authClientToken.rows.length === 0) {
            client.release();
            return res.status(400).json({succes:false, message: 'Sessão expirada, tente outra recuperação de senha'})
        } 
        
        if (authClientDate.rows.length === 0) {
            client.release();
            return res.status(400).json({success:false, message: 'Sessão expirada, tente outra recuperação de senha'});
        } else {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await client.query("UPDATE users SET password = $1, token = NULL, expiration_time = NULL WHERE token = $2", [hashedPassword, token]);
            client.release();
            return res.status(200).json({success:true, message: 'Senha redefinida com sucesso'});
        }
    }
    catch (error) {
        return res.status(500).json({sucess:false, message: 'Erro interno do servidor'})
    }
})

module.exports = router;