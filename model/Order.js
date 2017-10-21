//model for Order
const calculator = require('../local_modules/PriceCalculator.js');

var pizzaPrice = new calculator.PriceCalculator();



var mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

var courseSchema = new Schema({
    customerName: String,
    phoneNumber: String,
    streetAddress: String,
    city: String,
    postalCode: String,
    quantity: String,
    size: String,
    crust: String,
    toppings: String,
    sizeCost: String,//receive size Cost when being saved in the post method
    curstCost: String,
    toppingsCost: String,
    totalCost: String
}); 

//pizzaPrice(courseSchema.quantity, courseSchema.size, courseSchema.crust, courseSchema.toppings);

module.exports = mongoose.model('Order', courseSchema);