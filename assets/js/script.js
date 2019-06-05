function searchRecipe() {
    const EDAMAM_API_URL = "https://api.edamam.com/search?q=";
    const APP_ID = "3cb098f5";
    const APP_KEY = "89d403398d7ad55bcea389e0f14770d4";
    var ingredient = $('#search-ingredients').val();
    $.get(EDAMAM_API_URL + ingredient + "&app_id=" + APP_ID + "&app_key=" + APP_KEY,
    function (data) {
        console.log(data);
    }
    );
}

$(document).ready(function() {
    $('#search').submit(function(event) {
        event.preventDefault();
        searchRecipe(); 
    });
});


///api key 89d403398d7ad55bcea389e0f14770d4
///api id 3cb098f5