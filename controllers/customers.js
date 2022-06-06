const mongo = require('./database');
const joi=require('joi');
const fileMgmt = require('../shared/fileMgmt');


 module.exports= {
    addCustomer: async function (req, res,next) {
      const reqBody = req.body;

      const schema = joi.object({
        name: joi.string().required().min(2).max(200),
        phone: joi.string().required().regex(/^[0-9]\d{8,11}$/),
        email: joi.string().required().regex(/^[^@]+@[^@]+$/),
        country: joi.number().required(),
    
    })
    
    const {error, value}=  schema.validate(reqBody);

    if (error){
        res.send (`error adding customer ${error}`);
        return;
    }

            try {    
                const database = await mongo.getDb();
                const collection = database.collection('customers');
                collection.insertOne(value); // { name: '', phone..., email}
                res.json(value);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(`error adding customer`);
            }
        },
    

    customersList: async function (req, res,next) {
        const param = req.query;
        
        try {
            const database = await mongo.getDb();
            const collection = database.collection('customers');

            const result = await collection
                .find({})
                .sort({ name: 1 }) // ASC
                .toArray();
            
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    
   
    // todo: delete customer
    // sql: DROP
    deleteCustomer: async function(req, res, next) {

    },

    // todo: export all customers to file
    // sql: SELECT
    exportCustomers: async function(req, res, next) {
        fileMgmt.exportToFile(res, 'customers');

    },

    // todo: sort customers by column
    // sql: SORT BY ASC/DESC

    // todo: search in customers by parameter (name,email,country)
    // sql: SELECT WHERE
    findCustomer: async function(req, res, next) {},

    // todo: edit/update customer
    updateCustomer: async function(req, res, next) {},

    // todo: view more details of a customer
    viewCustomerDetails: async function(req, res, next) {},
    }








