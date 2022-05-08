const database =require('./database');
 
 module.exports= {
    //list:[],
    addCustomer:function (name,phone,email,country_id) {
        //const name = process.argv.slice(2);
    
        if (!name || name.length === 0) {
            throw('ERROR: username is empty');
        }
    
        const tempPwd = Math.floor(Math.random() * 10000000);
    
        // this.list.push({
        //     name: name,
        //     id: this.list.length,
        // });
        database.pool.getConnection(function(connErr,connection){
            if (connErr) throw connErr;//not connected!

           // const sql ="INSERT INTO customers(name,phone,email,country_id)" + " VALUES('"+ name +"','"+phone+"','"+email+"','"+countryId+"');"; 
            const sql ="INSERT INTO customers(name,phone,email,country_id)"  + " VALUES(?,?,?,?);";

            connection.query(sql,[name,phone,email,country_id],function(sqlErr,result,fields){
                if (sqlErr) throw sqlErr;
                console.log(fields);
                console.log(result);
            });


        });
    },
    

    customersList: async function (req, res) {
        const sql = "SELECT * FROM customers";

        try {    
            const connection = await database.getConnection();
            const result = await database.runQuery(connection, sql);
            res.send(result);
        } 
        catch (err) {
            console.log(err);
        }}}





