$(function ready() {
    $("#submitForm").submit(function (e) {
        e.preventDefault();

        var customerInfo = JSON.stringify({
            customerName: $('#customerName').val(),
            phoneNumber: $('#phoneNumber').val(),
            streetAddress: $('#streetAddress').val(),
            city: $('#city').val(),
            postalCode: $('#postalCode').val()
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