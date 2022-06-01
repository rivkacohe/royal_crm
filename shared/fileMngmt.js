const path = require('path');
const fs = require('fs');
const mongo = require('../controllers/database');

module.exports={
getHtmlFilePath: function (htmlFileMName){
    return path.join(__dirname, '../client', htmlFileMName);
},

exportFiles:async function (res, sql, filePrefix){
    try {  

        const result = await database.query( sql);
        const now =new Date().getTime();
        const filePath = path.join(__dirname,'../files',`products-${now}.txt`)
        const stream = fs.createWriteStream(filePath);
    

        const database = await mongo.getDb();
        const collection =database.collection(collectionName);

        const cursor = collection.find({});
        await cursor.forEeach(doc=>{
            stream.write(JSON.stringify(doc));
            stream.end()

            stream.on('close',function(){
                res.send(`success. file at: ${filePath}`);
            })
        })

        
        // stream.on('open',function(){
        //     stream.write(JSON.stringify(result[0]));
        //     stream.end();
        // });
    
        // stream.on('finish',function(){
        //     res.send(`succes. File at ${filePath}`);
        // });
    
    } 
    catch (err) {
     throw err;
    }
    
    }
}
