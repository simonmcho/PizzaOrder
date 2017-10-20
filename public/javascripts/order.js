$(function ready() {
   
    $.getJSON("/api/ordersList", (data) => {
        data.forEach(function(item){
            let toppingsArray = [];

            

            $('#orders').append('<tr><td>' + item.customerName + 
                                '</td><td>' + item.phoneNumber + 
                                '</td><td>' + item.streetAdress + 
                                '</td><td>' + item.city +
                                '</td><td>' + item.postalCode +
                                '</td><td>' + item.quantity + 
                                '</td><td>' + item.size + 
                                '</td><td>' + item.crust 
                            );
                if(item.toppings){
                    toppingsArray = item.toppings.split(",");
    
                    for(let i = 0; i < toppingsArray.length; i++){
                        let topping;
                        // if(toppingsArray[i].includes("Peppers")){
                        //     console.log(findUpperCase(toppingsArray[i]));
                        // }
                        $("#orders").append('</td><td>' + toppingsArray[i]);
                    }
                }
        });
    });

    // function findUpperCase(word){

    //     for(let i = 0; i < word.length; i++){
    //         if( word.charAt(i) == (word.charAt(i)).toUpperCase()  ){
    //             word.charAt(i) = " " + word.charAt(i);
    //         }
    //     }
    //     return word;
    // }

});