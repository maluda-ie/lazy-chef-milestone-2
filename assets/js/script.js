function searchRecipe() {
    const EDAMAM_BASE_API_URL = "https://api.edamam.com/search?";
    const APP_ID = "3cb098f5";
    const APP_KEY = "89d403398d7ad55bcea389e0f14770d4";
    var ingredient = $('#search-ingredients').val();
    var health = $('#dietry-requirements').val();
    var EDAMAM_API_URL = EDAMAM_BASE_API_URL + "app_id=" + APP_ID + "&app_key=" + APP_KEY +
    "&q=" + ingredient + "&health=" + health;
    
    $.ajax({
        url: EDAMAM_API_URL,
        type: "GET",
        crossDomain: true,
        success: buildRecipeContent,
        error: function(x, s) {
            $("#recipes-container").html("No recipes found!");
        }
    });
}

function buildRecipeContent(data) {
    console.log(data);
    var template = $("#recipe-template");
    var nameTemplate = template.find(".name")[0].outerHTML;
    var photoTemplate = template.find(".photo")[0].outerHTML;
    var ingredientLinesTemplate = template.find(".ingredient-lines")[0].outerHTML;
    var ingredientLineTemplate = template.find(".ingredient-lines li")[0].outerHTML;
    var templateHTML = template.html();
    var result = [];
    for (var i = 0; i < data.hits.length; i++) {
        var recipe = data.hits[i].recipe;
        result.push("<div>");
        result.push(nameTemplate.replace("{recipe-name}", recipe.label));
        result.push(photoTemplate.replace("{recipe-photo}", recipe.image));
        
        var ingredientLines = "";
        for (var j = 0; j < recipe.ingredientLines.length; j++) {
            ingredientLines += ingredientLineTemplate.replace("{ingredient-line}", recipe.ingredientLines[j]);
        }
        result.push(ingredientLinesTemplate.replace(ingredientLineTemplate, ingredientLines));
        result.push("</div>");
    }
    $("#recipes-container").html(result.join(""));
}

$(document).ready(function() {
    $('#search').submit(function(event) {
        event.preventDefault();
        searchRecipe(); 
    });
});


