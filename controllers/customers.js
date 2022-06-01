const mongo =require('./database');
const joi=require('joi');
const fs =require('fs');
const path = require('path');


 module.exports= {
    addCustomer: async function (req, res,next) {
      const reqBody = req.body;

      const schema = joi.object({
        name: joi.string().required().min(2).max(200),
        phone: joi.string().required().regex(/^[0-9]\d{8,11}$/),
        email: joi.string().required().regex(/^[^@]+@[^@]+$/),
        country: joi.string().required(),
    
    })
    
    const {error, value}=  schema.validate(reqBody);

    if (error){
      (`error adding customer ${error}`);
        return;
    }
          
    
            try {    
            const database = await mongo.getDb();
            const collection =database.collection('customers');
            collection.insertOne({value});//
            rex.json(value);
                } 
            catch (err) {
                console.log(err);
                res.status(400).send('error adding customer');
            }
         
            res.send(`${reqBody.name} added successfully`);


    },
    

    customersList: async function (req, res,next) {
        const param = req.query; // get method
    //     const schema = joi.object({
    //     column: joi.string().valid('name', 'email', 'country_name').default('name'),
    //     sort: joi.string().valid('ASC', 'DESC').default('ASC'),
    // });

    // const { error, value } = schema.validate(param);

    // const fieldsMap = new Map([
    //     ['name', 'customers.name'],
    //     ['email', 'customers.email'],
    //     ['country_name', 'countries.name'],
    // ]);

    // const sql = `SELECT customers.id, customers.name, customers.phone, customers.email,  
    //     countries.id AS country_id, countries.name AS country_name, countries.countryCode  
    //     FROM customers LEFT JOIN countries ON customers.country_id = countries.id 
    //     ORDER BY ${fieldsMap.get(value.column)} ${value.sort};`;

        try {    
            const database = await mongo.getDb();
            const collection =database.collection('customers');
            const result = await collection
            .find({})
            .sort({name:1})//ASC
            .toArray();
            res.json(result[0]);
        } 
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }},
    
   
    // todo: delete customer
    // sql: DROP
    deleteCustomer: async function(req, res, next) {

    },

    // todo: export all customers to file
    // sql: SELECT
    exportCustomers: async function(req, res, next) {

        // const sql ="SELECT cust.name, cust.phone, cust.email, " +
        // "cntr.name AS country_name FROM customers cust " +
        // "LEFT JOIN countries cntr ON cust.country_id = cntr.id ORDER BY cust.name ASC;";
        try {    
            const result = await database.query( sql);
            const now =new Date().getTime();
            const filePath = path.join(__dirname,'../files',`products-${now}.txt`)
            const stream = fs.createWriteStream(filePath);

            stream.on('open',function(){
                stream.write(JSON.stringify(result[0]));
                stream.end();
            });

            stream.on('finish',function(){
                res.send(`succes. File at ${filePath}`);
            });
       
        } 
        catch (err) {
         throw err;
        }
     
       
    },

    // todo: sort customers by column
    // sql: SORT BY ASC/DESC

    // todo: search in customers by parameter (name,email,country)
    // sql: SELECT WHERE
    findCustomer: async function(req, res, next) {

        const param= req.query;
        const schema= joi.object({
            search: joi.string().required().min(2)
        });

        const {error, value} = schema.validate(param);

        if (error){
            res.status(400).send(`search error:${error}`);
            throw error;
        }

        const searchQuery =`%${value.search}%`;

        const sql = `
        SELECT customers.id, customers.name, customers.phone, customers.email,  
        countries.id AS country_id, countries.name AS country_name, countries.countryCode  
        FROM customers LEFT JOIN countries ON customers.country_id = countries.id 
        WHERE customers.name LIKE ? or customers.email LIKE ?  or customers.country_id LIKE ?"+
        "ORDER BY customers.name ASC;`;

        try {    
            const result = await database.query( sql,[
                searchQuery,
                searchQuery,
                searchQuery , 
            ]);
            res.send(result[0]);
        } 
        catch (err) {
            console.log(err);
        }},


    // todo: edit/update customer
    updateCustomer: async function(req, res, next) {},

    // todo: view more details of a customer
    viewCustomerDetails: async function(req, res, next) {},
    }








