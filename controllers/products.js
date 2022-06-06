const database =require('./database');
const joi=require('joi');
const fileMgmt = require('../shared/fileMngmt'); 
module.exports={
    //products: [],
   addProduct:async function(req, res,next){

    const reqBody = req.body;

    const schema = joi.object({
        name: joi.string().required().min(2).max(200),
        description: joi.string().required(),
        price: joi.number().required(),
        price: joi.string(),

    
    })

    const {error, value}=  schema.validate(reqBody);
    if (error){
        res.send (`error adding customer ${error}`);
        return;
    }
       
       const sql ="INSERT INTO products(name,description,price,img)" +
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
        const sql = "SELECT* FROM products ORDER BY name ASC;";

        try{

const result =await database.query(sql);
res.send(result[0]);          
        }

        catch(err){
            console.log(err);
        }},
        exportProducts: async function(req, res, next){
            const sql = "SELECT name,description,price FROM products ORDER BY  name ASC;";
            fileMgmt.exportToFile(res, sql, 'products');
        },
        editProducts: async function(){
            const sql = "update name,description,price FROM products ORDER BY  name ASC;";
   
        },
        deleteProducts:async function(){
            const sql = "DELETE name,description,price FROM products ORDER BY  name ASC;";

        },
        searchProducts: async function(){
            const sql = "SELECT  WHERE name,description,price FROM products ORDER BY  name ASC;";

        }
}
   
