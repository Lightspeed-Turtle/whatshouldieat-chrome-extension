    // $(function() {
    //     $(function() {
    //         // Todo : Replace current mocked URL.
    //         $.get("database.json", function(data) {
    //             var SPACE_ID = 'lz8rxz1m2o5d'
    //             var ACCESS_TOKEN = 'a624220986fe3b346440c1558ba555f541701cf9181d39363ef686579153a343'

    //             var client = contentful.createClient({
    //                 space: SPACE_ID,
    //                 accessToken: ACCESS_TOKEN
    //             });

    //             var test = client.getEntries({
    //                 'content_type': 'recipe'
    //               }).then(function(entries) {
    //               console.log(entries);  
    //             });


    //             var recipes = JSON.parse(data);

    //             var randomRecipeIndex = Math.floor((Math.random() * recipes.length));
    //             var recipe = recipes[randomRecipeIndex];

    //             $(".intro").css("background", "url(" + recipe.imageUrl + ") no-repeat center center fixed");
    //             $(".intro").css("background-size", "cover");

    //             var preps = "<h4 class=\"uppercase\"><strong>PRÉPARATION</strong> " + recipe.preparation + "</h4>";
    //             preps += "<h4 class=\"uppercase\"><strong>CUISSON</strong> " + recipe.cuisson + "</h4>";
    //             preps += "<h4 class=\"uppercase\"><strong>PORTIONS</strong> " + recipe.portions + "</h4>";
    //             $("#summary").append(preps);

    //             var recipeName = "<h3 class=\"uppercase bold\" style=\"text-align:left;\">" + recipe.name + "</h3>";
    //             $("#recipe").prepend(recipeName);

    //             for (var i = 0; i < recipe.ingredients.length; i++) {
    //                 var item = "<h4 class=\"bold\" style=\"font-style:italic;\">" + recipe.ingredients[i].item + "</h4>"

    //                 var list = "<ul>"
    //                 for (var f = 0, len = recipe.ingredients[i].ingredients.length; f < len; f++) {
    //                     list += "<li style=\"text-align:left;\">" + recipe.ingredients[i].ingredients[f] + "</li>";
    //                 }
    //                 list += "</ul>"

    //                 $("#ingredients").append(item);
    //                 $("#ingredients").append(list);
    //             }      

    //             for (var i = 0; i < recipe.instructions.length; i++) {
    //                 var item = "<h4 class=\"uppercase bold\" style=\"text-align:left;font-style:italic;\">" + recipe.instructions[i].item + "</h4>"

    //                 var list = "<ul style=\"text-align:left;\">"
    //                 for (var f = 0, len = recipe.instructions[i].steps.length; f < len; f++) {
    //                     list += "<li>" + recipe.instructions[i].steps[f] + "</li>";
    //                 }
    //                 list += "</ul>"

    //                 $("#instructions").append(item);
    //                 $("#instructions").append(list);
    //             }    
    //         });
    //     });
    // });

    $(function() {
        $(function() {
            var SPACE_ID = 'lz8rxz1m2o5d'
            var ACCESS_TOKEN = 'a624220986fe3b346440c1558ba555f541701cf9181d39363ef686579153a343'

            var client = contentful.createClient({
                space: SPACE_ID,
                accessToken: ACCESS_TOKEN
            });

            var test = client.getEntries({
                'content_type': 'recipe'
            }).then(function(entries) {
                 
                var recipes = entries.items;

                var randomRecipeIndex = Math.floor((Math.random() * recipes.length));
                var recipe = recipes[randomRecipeIndex];

                $(".intro").css("background", "url(" + recipe.fields.imageUrl + ") no-repeat center center fixed");
                $(".intro").css("background-size", "cover");

                var preps = "<h4 class=\"uppercase\"><strong>PRÉPARATION</strong> " + recipe.fields.preparation + "</h4>";
                preps += "<h4 class=\"uppercase\"><strong>CUISSON</strong> " + recipe.fields.cuisson + "</h4>";
                preps += "<h4 class=\"uppercase\"><strong>PORTIONS</strong> " + recipe.fields.portions + "</h4>";
                $("#summary").append(preps);

                var recipeName = "<h3 class=\"uppercase bold\" style=\"text-align:left;\">" + recipe.fields.name + "</h3>";
                $("#recipe").prepend(recipeName);

                for (var i = 0; i < recipe.fields.ingredients.length; i++) {

                    if (recipe.fields.ingredients[i].fields.item) {
                        var item = "<h4 class=\"bold\" style=\"font-style:italic;\">" + recipe.fields.ingredients[i].fields.item + "</h4>";
                        $("#ingredients").append(item);
                    }

                    var list = "<ul>"
                    for (var f = 0, len = recipe.fields.ingredients[i].fields.ingredients.length; f < len; f++) {
                        list += "<li style=\"text-align:left;\">" + recipe.fields.ingredients[i].fields.ingredients[f] + "</li>";
                    }
                    list += "</ul>"

                    $("#ingredients").append(list);
                }      

                for (var i = 0; i < recipe.fields.instructions.length; i++) {
                    if (recipe.fields.instructions[i].fields.item) {
                        var item = "<h4 class=\"uppercase bold\" style=\"text-align:left;font-style:italic;\">" + recipe.fields.instructions[i].fields.item + "</h4>"
                        $("#instructions").append(item);                        
                    }

                    var list = "<ul style=\"text-align:left;\">"
                    for (var f = 0, len = recipe.fields.instructions[i].fields.steps.length; f < len; f++) {
                        list += "<li>" + recipe.fields.instructions[i].fields.steps[f] + "</li>";
                    }
                    list += "</ul>"

                    $("#instructions").append(list);
                } 
            });
        });
    });

