    $(function() {
        var recipe;

        $(function() {
            createContentfulClient().getEntries({
                'content_type': 'recipe'
            }).then(function(entries) {
                recipe = fetchRandomRecipeFrom(entries.items);
                
                setBackground();
                setLogo();
                setRecipeName();
                setExecutionTime();
                setPortions();
                setLink();
            });
        });

        function createContentfulClient() {
            var SPACE_ID = 'lz8rxz1m2o5d'
            var ACCESS_TOKEN = 'a624220986fe3b346440c1558ba555f541701cf9181d39363ef686579153a343'

            var client = contentful.createClient({
                space: SPACE_ID,
                accessToken: ACCESS_TOKEN
            });

            return client;
        }

        function fetchRandomRecipeFrom(recipes) {
            var randomRecipeIndex = Math.floor((Math.random() * recipes.length));
            return recipes[randomRecipeIndex];
        }

        function setBackground() {
            $(".intro").css("background", "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url(https:" + recipe.fields.image.fields.file.url  + ") no-repeat fixed");
            $(".intro").css("background-size", "cover");
        }

        function setLogo() {
            console.log(recipe);
            $("#logo").append("<img src=\"https:" + recipe.fields.logo.fields.file.url + "\" />")
        }

        function setRecipeName() {
            $("#name")[0].innerHTML = recipe.fields.name;
        }

        function setExecutionTime() {
            $("#execution")[0].innerHTML = "temps d'exécution · " + recipe.fields.preparationTime;
        }

        function setPortions() {
            $("#portions")[0].innerHTML = recipe.fields.portions;
        }

        function setLink() {
            $("#logo-link").attr("href", recipe.fields.blog);
            $("#link").attr("href", recipe.fields.blog);
        }
    });

