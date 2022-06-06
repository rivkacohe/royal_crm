const mongo =require('./database');
const joi=require('joi');
const fileMgmt = require('../shared/fileMgmt');

module.exports={
   // orders:[],
    addOrder: async function (req, res,next){
        const reqBody = req.body;

        const schema = joi.object({
          customerId: joi.string().required().min(1).max(200),
          productId: joi.string().required().min(1).max(200),
          price: joi.number().required(),
          quantity: joi.number().required().min(1)
      })
      
      const {error, value}=  schema.validate(reqBody);
  
      if (error){
          res.send (`error adding order ${error}`);
          return;
      }
            
      try {    
        const database = await mongo.getDb();
        const collection = database.collection('orders');
        collection.insertOne(value); 
        res.json(value);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(`error adding order`);
    }

    },
    
    ordersList: async function (req, res,next) {  
       const param = req.query;
        
        try {
            const database = await mongo.getDb();
            const collection = database.collection('orders');

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
    
    
     exportOrders: async function (req, res, nexts) {
        fileMgmt.exportToFile(res, 'orders');

     },
     searchOrders: async function () {},
                }
        