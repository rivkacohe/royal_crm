const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const joi = require('joi');
const database = require('./database');
const bcrypt = require('bcrypt');
const { json } = require('express/lib/response');

module.exports = {
    login: async function (req, res, next) {
        const reqBody = req.body;

        const sechema = joi.object({
            email: joi.string().required().min(6).max(255).email(),
            password: joi.string().required().min(6),
        });

        const { error, value } = sechema.validate(reqBody);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send('Unauthorized');
            return;
        }

        const sql = 'SELECT * FROM users WHERE email=?;';

        try {
            const result = await database.query(sql, [reqBody.email]);
            const rows = result[0];
            // $2b$10$nOpWM1slxvsqdsHhW4VRkeY8fDsndvrf8aKHAwNdpgf
            // 123456
            const validPassword = await bcrypt.compare(reqBody.password, rows[0].password_hash);
            if (!validPassword) throw 'Invalid password';
            const param = { email: reqBody.email };
            const token = jwt.sign(param, config.JWT_SECRET, { expiresIn: '72800s' });
       
       res
       json({
           token: token
       });
       
       
        } catch (err) {
            console.log(`Error: ${err}`);
            res.status(401).send('Unauthorized');
            return;
        }
    },
} 