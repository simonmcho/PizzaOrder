$(function ready() {
   
    $.getJSON("/api/ordersList", (data) => {
        data.forEach(function(item){
            $('#orders').append('<tr><td>' + item.customerName + 
                                '</td><td>' + item.phoneNumber + 
                                '</td><td>' + item.streetAdress + 
                                '</td><td>' + item.city +
                                '</td><td>' + item.postalCode);
        });
    });
});