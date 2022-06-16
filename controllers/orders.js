const database =require('./database');
const joi=require('joi');
const fileMngmt = require('../shared/fileMngmt');

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
            
      const sql ="INSERT INTO orders(customerId,productId,price,quantity)"  + " VALUES(?,?,?,?);";

  
              try {    
                  const result = await database.query(
                       sql,
                       [
                          reqBody.customerId,
                          reqBody.productId,
                          reqBody.price,
                          reqBody.quantity
                      ]);
                  } 
              catch (err) {
                  console.log(err);
                  return;
              }
           
              res.send(`order added successfully`);
  
  

    },
    
    ordersList: async function (req, res,next) {
        const sql = "SELECT orderId,orderTime,customer.name,product.name,product.price FROM `orders`"+
        " left JOIN customers customer ON customerId=customer.id"+
        " left JOIN products product ON orders.productId=product.productId";
debugger
        try{
            const result = await 
            database.query(sql);
            res.send(result[0]);          
                    }
            
                    catch(err){
                        console.log(err);
                    }},
    
    
     exportOrders: async function (req, res, next) {
        const sql = "SELECT orders.orderTime, orders.price, orders.quantity, "+ 
        "p.name, p.description, p.img, "+
        "cust.name, cust.phone, cust.email FROM orders orders "+
        " LEFT JOIN products p ON orders.productId = p.productId"+
        " LEFT JOIN customers cust ON orders.customerid = cust.id"+
         " ORDER BY orders.orderId ASC;";

        fileMngmt.exportFiles(res,sql, 'orders');
     },
     
     searchOrders: async function () {},
                }
        