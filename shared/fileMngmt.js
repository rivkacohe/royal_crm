const path = require('path');
const fs = require('fs');
const database = require('../controllers/database');

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
    
    }
}