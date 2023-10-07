

$(document).ready(function(){

    $("#collapse").on("click", function(){

        $(".box2-2").toggleClass("active");
        $("#sidebar").toggleClass("active");
                           
    })



})


var modal = document.getElementById('id01');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



