$(function() {
    
    //Create dropdown for quantity
    if($("select").hasClass("quantity")) {
        var $quantityDropdown = $(".quantity");

        for(let i = 1; i <= 12; i++){
                $quantityDropdown.append($('<option class="dropdown-item"></option>').val(i).html(i));
            }
    } 
});