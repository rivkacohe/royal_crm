 module.exports= {
    list:[],
    addCustomer:function () {
        const name = process.argv.slice(2);
    
        if (!name || name.length === 0) {
            throw('ERROR: username is empty');
        }
    
        const tempPwd = Math.floor(Math.random() * 10000000);
    
        this.list.push({
            name: name,
            id: this.list.length,
        });
    },
    
     customerList:function(){
        this.list.forEach(customer =>{
            console.log(`ok.name:${customer.name} was created`);
        })
    }
}





