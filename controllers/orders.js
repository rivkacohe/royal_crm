const database =require('./database');

module.exports={
   // orders:[],
    // addOrder: function (customerId,productId,price,quantity){
    //     //const name = process.argv.slice(2);
    //     if (!productId || productId.length === 0) {
    //         throw('ERROR: productId is empty');
    //     }
    //     // this.orders.push({
    //     //     name: name,
    //     //     id: this.orders.length,
    //     // });
    //     database.pool.getConnection(function(connErr,connection){
    //         if (connErr) throw connErr;//not connected!

    //         const sql ="INSERT INTO orders(customerId,productId,price,quantity)"  + " VALUES(?,?,?,?);";

    //         connection.query(sql,[customerId,productId,price,quantity],function(sqlErr,result,fields){
    //             if (sqlErr) throw sqlErr;
    //             console.log(fields);
    //             console.log(result);
    //         });
    //     });
    // },
    
    ordersList: async function (req, res,next) {
        const sql = "SELECT* FROM orders";

        try{
            const result = await 
            database.query(sql);
            res.send(result[0]);          
                    }
            
                    catch(err){
                        console.log(err);
                    }}}
        