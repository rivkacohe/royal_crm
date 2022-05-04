const mysql = require('mysql2');
const config = require('../config/dev')
 const pool = mysql.createPool({
     host: config.DB_HOST,
     user: config.DB_USER,
     password: config.DB_PASSWORD,
     database: config.DB_DATABASE,
     waitForConnections: true,
     connectionLimit: 5,
     queueLimit:0
 });
 
module.exports={
    //products: [],
    addProduct: function(name,description,price,img){
       // const name = process.argv.slice(2);

        if (!name || name.length===0){
            throw('ERROR: name id empty');
        }
        // this.products.push({
        //     name:name,
        //     id:this.products.length
        pool.getConnection(function(connErr,connection){
            if (connErr) throw connErr;//not connected!
            const sql ="INSERT INTO products(name,description,price,img)" + " VALUES(?,?,?,?);";
            
            connection.query(sql,
                [name,description,price,img],function(sqlErr,result,fields){
               if (sqlErr) throw sqlErr;
               console.log(fields);
               console.log(result);
           }); 

        }
        )
    },

    
    productsList:function(req,res){
        // this.products.forEach(product=>{
        //     console.log(`ok. name:${this.products.name} was created`);
        pool.getConnection(function (connErr,connection){
            if (connErr) throw connErr;
    
            const sql = "SELECT* FROM products";
    
            connection.query(sql,function(sqlErr,result,fields){
                if (sqlErr) throw sqlErr;
    
                res.send(result)
            
            });
        });
    }
}