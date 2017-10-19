//model for Order
var mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

var courseSchema = new Schema({
    customerName: String,
    phoneNumber: String,
    streetAddress: String,
    city: String,
    postalCode: String
    // quantity: number,
    // size: number,
    // sizeCost: number,
    // crust: String,
    // crustCost: number,
    // toppings: String,
    // toppingsCost: number,
    // totalCost: number
}); 

module.exports = mongoose.model('Order', courseSchema);