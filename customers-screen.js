const c = require('./customers')
const p= require('./products')
const o = require('./orders')

c.addCustomer();
c.customerList();

p.addProduct();
p.productsList()

o.addOrder();
o.ordersList();