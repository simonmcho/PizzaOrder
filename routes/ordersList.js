let express = require('express');
let Order   = require('../model/Order');
let Pizza   = require('../local_configs/config.json');

let router = express.Router();

router.get('/', (req, res) => {
    var vm = {
        title: "Simmonson's Pizza Order",
        sizes: Pizza.pizzaSize,
        crusts: Pizza.pizzaCrust,
        toppings: Pizza.toppings
    };
    res.render('index', vm);
    console.log('clicked to render index');
});

router.get('/ordersList', (req, res) => {
    var vm = {title: "Pizza Order Title in routes/order.js, for ordersList.ejs"};
    res.render('ordersList', vm);
    console.log('clicked to render ordersList');
});

//Rest Endpoint
router.get('/api/ordersList', (req, res) => {
    console.log("you have requested to get the OrderList page");
    Order.find({}, (err, customerOrder) => {
        if(err){//show error if error was found
            console.log(err);
            console.log(res.json(customerOrder));
        }
        //parse the json for order from mongoDB
        res.json(customerOrder);
    });
});

//search query using phone number
router.get('/api/ordersList/:phoneSearchInput', (req, res) => {
    console.log("searching via phone number");
    console.log(req.query.phoneNumber);
    Order.find({"phoneNumber": req.query.phoneNumber}, (err, customerOrder) => {
        if(err){//show error if error was found
            console.log(err);
            console.log(res.json(customerOrder));
        }
        //parse the json for order from mongoDB
        res.json(customerOrder);
    });
});

//search query using address
router.get('/api/ordersList/:streetAddress', (req, res) => {

});

router.post('/api/ordersList', (req, res) => { 
    var customerOrder = new Order(req.body);

    console.log("Received an order request", customerOrder);

    //validation
    if(!customerOrder.customerName || !customerOrder.phoneNumber || !customerOrder.streetAddress || !customerOrder.city || !customerOrder.postalCode){
        //Missing necessary info to do post request with customer's order
        res.status(400);
        json({error: "Missing necessary information from customer to place a pizza order."});
        return;
    }

    customerOrder.save((err) => {
        if(err) {
            console.log("Your error from your post request: ", err);
            res.status(500).json({status: "Failed to place an order..."});
            return;
        }
        //Add order if no errors
        res.json({status: "Successfully placed an order!"});
    });
});

module.exports = router;