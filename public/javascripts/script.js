$(function ready() {
    //Create dropdown for quantity
    if($("select").hasClass("quantity")) {
        var $quantityDropdown = $(".quantity");

        for(let i = 1; i <= 12; i++){
                $quantityDropdown.append($('<option></option>').val(i).html(i));
            }
        }

    //client side on submit
    $("#submitForm").submit(function (e) {
        console.log('submitted');
        e.preventDefault();

        var customerInfo = JSON.stringify({
            customerName: $('#customerName').val(),
            phoneNumber: $('#phoneNumber').val(),
            streetAddress: $('#streetAddress').val(),
            city: $('#city').val(),
            postalCode: $('#postalCode').val(),
            quantity: $('#quantity').val(),
            size: $('.size:checked').val(),
            crust: $('.crust:checked').val(),
            toppings: $('.toppings:checked').map(function() {
                return this.value;
            }).get()
        });

        $.ajax({
            url: '/api/ordersList',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: customerInfo,
            success: function (json, status, request) {
                $('#order-request-status').removeClass();
                $('#order-request-status').addClass('alert alert-success');
                $('#order-request-status').html('Placed an order successfully!');
            },
            error: function (request, status) {
                $('#order-request-status').removeClass();
                $('#order-request-status').addClass('alert alert-danger');
                $('#order-request-status').html('Error placing an order...');
                console.log('Request failed : ', status);
            }
        });
    });
});