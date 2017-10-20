$(function ready() {
    const SEARCH_OPTIONS = ["Phone Number", "Street Address"];

    if($("select").hasClass("searchOptions")){    

        for(let i = 0; i < SEARCH_OPTIONS.length; i++){
            $(".searchOptions").append($('<option></option>').val(SEARCH_OPTIONS[i]).html(SEARCH_OPTIONS[i]));
        }
    }
   
    $.getJSON("/api/ordersList", (data) => {
        data.forEach(function(item){
            let toppingsArray = [];

            showQueryResults('#orders', item);

                if(item.toppings){
                    toppingsArray = item.toppings.split(",");
    
                    // for(let i = 0; i < toppingsArray.length; i++){
                    //     let topping;
                    //     //do this to separate words into two
                    //     // if(toppingsArray[i].includes("Peppers")){
                    //     //     console.log(findUpperCase(toppingsArray[i]));
                    //     // }
                    //     $("#orders").append('</td><td>' + toppingsArray[i]);
                    // }
                }
        });
    });


    //Search Functionality
    $(".search").submit((e) => {
        e.preventDefault();

        var $searchQuery = $("#searchInput").val();
        console.log($searchQuery);

        $.getJSON("/api/ordersList", (data) => {
            $("#orders tr:gt(0)").remove();//remove all elements except table headers

            data.forEach((item) => {
                //search via phone number
                if( (item.phoneNumber).indexOf($searchQuery) > -1){
                    showQueryResults("#orders", item);
                } else if( (item.streetAddress).toLowerCase().indexOf(
                               ($searchQuery).toLowerCase()
                            ) > -1 ){//search via street address
                    showQueryResults("#orders", item);
                } else if ($searchQuery == ''){//show all if search value is blank
                    console.log(item);
                    showQueryResults("#orders", item);
                }
            });
        });
    });
});

//function to show query 
function showQueryResults(query, item){
    $(query).append('<tr><td>' + item.customerName + 
                    '</td><td>' + item.phoneNumber + 
                    '</td><td>' + item.streetAddress + 
                    '</td><td>' + item.city +
                    '</td><td>' + item.postalCode +
                    '</td><td>' + item.quantity + 
                    '</td><td>' + item.size + 
                    '</td><td>' + item.crust +
                    '</td><td>' + item.toppings + '</td></tr>'
    );
}

//Search Option Dropdown
// function searchDropdownSelect() {
//     switch(this.value){
//          case "Phone Number":
//              $(".search").removeAttr('id');
//              $(".search").attr('id', "phoneSearch");
//              $(".form-control").removeAttr('id');
//              $(".form-control").attr('id', "phoneNumberInput");
//              break;
//          case "Street Address":
//              $(".search").removeAttr('id');
//              $(".search").attr('id', "addressSearch");
//              $(".form-control").removeAttr('id');
//              $(".form-control").attr('id', "streetAddressInput");
//              break;
//          default:
//              console.log("something weird with dropdown");
//     }
// }


    // function findUpperCase(word){

    //     for(let i = 0; i < word.length; i++){
    //         if( word.charAt(i) == (word.charAt(i)).toUpperCase()  ){
    //             word.charAt(i) = " " + word.charAt(i);
    //         }
    //     }
    //     return word;
    // }

