$(function() {
    
    //Create dropdown for quantity
    if($("select").hasClass("quantity")) {
        var $quantityDropdown = $(".quantity");

        for(let i = 1; i <= 12; i++){
                $quantityDropdown.append($('<option class="dropdown-item"></option>').val(i).html(i));
            }
    } 
    
    //check if all checkboxes are unchecked...do for later project
    // var $inputToppings = $(".toppings");
    
    // if( $inputToppings.length == 0 && $inputToppings.length == $(".toppings:checked").length) {

    // }
    

});