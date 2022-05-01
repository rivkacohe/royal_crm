module.exports={
    products: [],
    addProduct: function(){
        const name = process.argv.slice(2);

        if (!name || name.length===0){
            throw('ERROR: name id empty');
        }
        this.products.push({
            name:name,
            id:this.products.length
        }
        )
    },
    productsList:function(){
        this.products.forEach(product=>{
            console.log(`ok. name:${this.products.name} was created`);
        })
    }
}