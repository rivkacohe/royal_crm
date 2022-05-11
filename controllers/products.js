const database =require('./database');
 
module.exports={
    //products: [],
    // addProduct: function(name,description,price,img){
    //    // const name = process.argv.slice(2);

    //     if (!name || name.length===0){
    //         throw('ERROR: name id empty');
    //     }
    //     // this.products.push({
    //     //     name:name,
    //     //     id:this.products.length
    //     database.pool.getConnection(function(connErr,connection){
    //         if (connErr) throw connErr;//not connected!
    //         const sql ="INSERT INTO products(name,description,price,img)" + " VALUES(?,?,?,?);";
            
    //         connection.query(sql,
    //             [name,description,price,img],function(sqlErr,result,fields){
    //            if (sqlErr) throw sqlErr;
    //            console.log(fields);
    //            console.log(result);
    //        }); 

    //     }
    //     );
    // },

    productsList: async function (req, res, next) {
        const sql = "SELECT* FROM products";

        try{

const result =await database.query(sql);
res.send(result[0]);          
        }

        catch(err){
            console.log(err);
        }}}
   
