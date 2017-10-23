let express          = require('express');
let expressValidator = require('express-validator');
let check            = require('express-validator/check');
let Order            = require('../model/Order');
let Pizza            = require('../local_configs/config.json');
let Calculator       = require('../local_modules/PriceCalculator.js');

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
        return;
    });
   
});


router.get('/api/ordersList/:phoneNumber', (req, res) => {
    console.log("searching via phone number");
     //search query using phone number
     console.log(req.query);
     Order.find({"phoneNumber": req.query.phoneNumber}, (err, customerOrder) => {
        if(err){//show error if error was found
            console.log(err);
            console.log(res.json(customerOrder));
            return;
        }

        //parse the json for order from mongoDB
        res.json(customerOrder);
        return;
    });
   
});


router.get('/api/ordersList/:streetAddress', (req, res) => {
    console.log("searching via ", req.query);

    Order.find({"streetAddress": req.query.streetAdress}, (err, customerOrder) => {
        if(err){//show error if error was found
            console.log(err);
            console.log(res.json(customerOrder));
            return;
        }

        //parse the json for order from mongoDB
        res.json(customerOrder);
    });
});

router.post('/api/ordersList', [
    //use express validator check to validate user entry
    check.body('customerName', "Please enter your name.")
    .exists().not().isEmpty()
    .withMessage("A name is required."),

    check.body('phoneNumber', "Please enter only digits.")
    .exists().not().isEmpty()
    .withMessage("A phone number is required. Please use only digits.")
    .isMobilePhone('any'),

    check.body('streetAddress', "Please use alphanumeric characters.")
    .exists().not().isEmpty()
    .withMessage("A street address is required."),

    check.body('city', "Please use alphanumeric characters.")
    .exists().not().isEmpty()
    .withMessage("A city name is required."),

    check.body('postalCode', "A valid postal code is required")
    .exists().not().isEmpty()
    .withMessage("A valid postal code is required.")
    .isPostalCode('CA')

], (req, res) => { 

    const errors = check.validationResult(req);//init with express validator method for errors
    var customerOrder = new Order(req.body);//init with Order object using req.body data

    //if express-validator errors
    if(!errors.isEmpty()) {
        const errorMessages = errors.mapped();

        console.log(errors.mapped());
        res.status(500).json({
            status: "Information is not in the correct format",
            nameError: errorMessages.hasOwnProperty('customerName') ? errorMessages.name.msg : null,
            phoneError: errorMessages.hasOwnProperty('phoneNumber') ? errorMessages.phoneNumber.msg : null,
            addressError: errorMessages.hasOwnProperty('streetAddress') ? errorMessages.streetAddress.msg : null,
            cityError: errorMessages.hasOwnProperty('city') ? errorMessages.city.msg : null,
            postalCodeError: errorMessages.hasOwnProperty('postalCode') ? errorMessages.postalCode.msg : null
        });
    }else {
        console.log("Received an order request", customerOrder);

        //validation
        if(!customerOrder.customerName || !customerOrder.phoneNumber || !customerOrder.streetAddress || !customerOrder.city || !customerOrder.postalCode){
            //Missing necessary info to do post request with customer's order
            res.status(400);
            json({error: "Missing necessary information from customer to place a pizza order."});
            return;
        }

        var pizzaPrice = new Calculator.PriceCalculator(customerOrder.quantity, customerOrder.size, customerOrder.crust, customerOrder.toppings);
        
        console.log(pizzaPrice.showPizzaCrustCost());
        console.log(pizzaPrice.calculateToppingsCost());

        customerOrder['sizeCost'] = pizzaPrice.showPizzaSizeCost();
        customerOrder['toppingsCost'] = pizzaPrice.calculateToppingsCost();
        customerOrder['totalCost'] = pizzaPrice.calculateTotalCost();
        customerOrder['crustCost'] = pizzaPrice.showPizzaCrustCost();

        customerOrder.save((err) => {
            if(err) {
                console.log("Your error from your post request: ", err);
                res.status(500).json({status: "Failed to place an order..."});
                return;
            }
            //Add order if no errors
            res.json({status: "Successfully placed an order!"});
        });
    }
});

module.exports = router;