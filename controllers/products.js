const database = require('./database');
const joi = require('joi');
const fileMngmt = require('../shared/fileMngmt');

module.exports = {
    //products: [],
    addProduct: async function (req, res, next) {

        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().required().min(2).max(200),
            description: joi.string().required(),
            price: joi.number().required(),
            price: joi.string(),


        })

        const { error, value } = schema.validate(reqBody);
        if (error) {
            res.send(`error adding customer ${error}`);
            return;
        }

        const sql = "INSERT INTO products(name,description,price,img)" +
            " VALUES(?,?,?,?);";

        try {
            const result = await database.query(
                sql,
                [
                    reqBody.name,
                    reqBody.description,
                    reqBody.price,
                    reqBody.img
                ]);
        }
        catch (err) {
            console.log(err);
            return;
        }

        res.send(`${reqBody.name} added successfully`);


    },

     productsList: async function (req, res, next) {
         /*
        1. [V] add fields in the products html
        2. [V] get the parameters from the request
        3. [V] validate parameters using joi
        4. [V] if validation fail - return error
        6. [V] update sql query with parameters
        */

        const param = req.query;

        const schema = joi.object({
            column: joi.string().valid('name', 'price').default('name'),
            sort: joi.string().valid('ASC', 'DESC').default('ASC'),
        });

        const { error, value } = schema.validate(param);

        if (error) {
            // console.log(error);
            res.status(400).send('add failed');
            throw error;
        }

        const fieldsMap = new Map([
            ['name', 'products.name'],
            ['price', 'products.price'],
        ]);

    const sql = `SELECT * FROM products ORDER BY ${fieldsMap.get(value.column)} ${value.sort};`;

        try {

            const result = await database.query(sql);
            res.json(result[0]);
        }

        catch (err) {
            console.log(err);
        }
    },
    exportProducts: async function (req, res, next) {
        const sql = "SELECT name,description,price FROM products ORDER BY  name ASC;";
        fileMngmt.exportFiles(res,sql,'products');
    },

    editProducts: async function (req, res, next) {
        const reqBody = req.body;
        const schema = joi.object({
            name: joi.string().min(2).max(200),
            description: joi.string(),
            price: joi.number(),
            image: joi.string().min(5).max(200),
        }).min(1);

        console.log(req.body);
        const { error, value } = schema.validate(reqBody);

        if (error) {
            res.status(400).send(`error update product ${error}`);
            return;
        }

        const keys = Object.keys(value);   // ['name','price']
        const values = Object.values(value); // ['aaa', 15]
        // const fields = keys.map(key => `${key}=?`); // ['name=?','price=?']
        // const parseFileds = fields.join(','); // 'name=?,price=?'
        const fields = keys.map(key => `${key}=?`).join(',');
        values.push(req.params.productId);
        const sql = `UPDATE products SET ${fields} WHERE productId=?`;

        try {
            const result = await database.query(sql, values);
            res.json(value);
        }
        catch (err) {
            console.log(err);
            return;
        }

    },
    deleteProducts: async function (req, res, next) {

        // get client id that we want to delete
        // validate: number not null
        // const sql = DELETE
        // return details of deleted product

        const schema = joi.object({
            productId: joi.number().required()
        });
        const { error, value } = schema.validate(req.params);

        if (error) {
            res.status(400).send('error delete product');
            console.log(error.details[0].message);
            return;
        }

        const sql = `DELETE FROM products WHERE productId=?`;

        try {
            const result = await database.query(sql, [value.productId]);
            res.json({
                productId: value.productId
            });
        }
        catch (err) {
            res.status(400).send('error delete product');
            console.log(err.message);
        }
    },
    searchProducts: async function () {
        const sql = "SELECT  WHERE name,description,price FROM products ORDER BY  name ASC;";

    }
}

