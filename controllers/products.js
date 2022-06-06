const database =require('./database');
const joi=require('joi');
const fileMgmt = require('../shared/fileMgmt');
 
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
        res.send (`error adding product ${error}`);
        return;
    }

        try {    
            const database = await mongo.getDb();
            const collection = database.collection('products');
            collection.insertOne(value); 
            res.json(value);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(`error adding product`);
        }

},

    productsList: async function (req, res, next) {
        const param = req.query;
        
        try {
            const database = await mongo.getDb();
            const collection = database.collection('products');

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
        exportProducts: async function(req, res, next){
            fileMgmt.exportToFile(res, 'products');
        },
        editProducts: async function(){
   
        },
        deleteProducts:async function(){

        },
        searchProducts: async function(){

        }
}
   
