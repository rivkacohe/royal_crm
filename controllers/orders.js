module.exports={
    orders:[],
    addOrder: function (){
        const name = process.argv.slice(2);
        if (!name || name.length === 0) {
            throw('ERROR: username is empty');
        }
        this.orders.push({
            name: name,
            id: this.orders.length,
        });
    },
    
    ordersList:function(){
       this.orders.forEach(order =>{
           console.log(`ok.id:${order.id} was created`);
       })
   }
}