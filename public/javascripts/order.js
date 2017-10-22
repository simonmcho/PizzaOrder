$(function ready() {
    const SEARCH_OPTIONS = ["Phone Number", "Street Address"];

    if($("select").hasClass("searchOptions")){    
        
                for(let i = 0; i < SEARCH_OPTIONS.length; i++){
                    $(".searchOptions").append($('<option></option>').val(SEARCH_OPTIONS[i]).html(SEARCH_OPTIONS[i]));
                }
    }
    
   //Show All Orders
    $.getJSON("/api/ordersList", (data) => {
        data.forEach(function(item){
            let toppingsArray = [];
            
            showQueryResults('#orders', item);

                if(item.toppings){
                }
            });
    });

    //Search Functionality
    $(".search").submit((e) => {
        e.preventDefault();

        var $searchQuery = $("#searchInput").val();
        //search by phone number
        if( $('.searchOptions option:selected').text() == SEARCH_OPTIONS[0] ){
            
            $.getJSON("/api/ordersList", (data) => {
                $("#orders tr:gt(0)").remove();//remove all elements except table headers

                data.forEach((item) => {
                    if( (item.phoneNumber).indexOf($searchQuery) > -1){
                        showQueryResults("#orders", item);
                    } else if ($searchQuery == ''){//show all if search value is blank
                        showQueryResults("#orders", item);
                    }
                });
            });
        } else if( $('.searchOptions option:selected').text() == SEARCH_OPTIONS[1] ){//search by street address

            $.getJSON("/api/ordersList", (data) => {
                $("#orders tr:gt(0)").remove();//remove all elements except table header

                data.forEach((item) => {
                    //search via street address
                   if( (item.streetAddress).toLowerCase().indexOf(
                            ($searchQuery).toLowerCase() ) > -1 ){
                        showQueryResults("#orders", item);
                    } else if ($searchQuery == ''){//show all if search value is blank
                        showQueryResults("#orders", item);
                    }//end of else if
                });//end of data.forEach
            });//end of getJSON
        }//end of search by street address

    });//end of search functionality
});//end of function ready IIFE

//function to show query 
function showQueryResults(query, item){
    $(query).append('<tr><td>' + item.customerName + 
                    '</td><td>' + item.phoneNumber + 
                    '</td><td>' + item.streetAddress + 
                    '</td><td>' + item.city +
                    '</td><td>' + item.postalCode +
                    '</td><td>' + item.quantity + 
                    '</td><td>' + item.size + 
                    '</td><td>' + '$' + parseFloat(item.sizeCost).toFixed(2) + 
                    '</td><td>' + item.crust +
                    '</td><td>' + '$' + parseFloat(item.crustCost).toFixed(2) + 
                    '</td><td>' + item.toppings + 
                    '</td><td>' + '$' + parseFloat(item.toppingsCost).toFixed(2) + 
                    '</td><td>' + '$' + parseFloat(item.totalCost).toFixed(2)  + 
                    '</td></tr>'
    );
}//end of show query function


    // function findUpperCase(word){

    //     for(let i = 0; i < word.length; i++){
    //         if( word.charAt(i) == (word.charAt(i)).toUpperCase()  ){
    //             word.charAt(i) = " " + word.charAt(i);
    //         }
    //     }
    //     return word;
    // }

