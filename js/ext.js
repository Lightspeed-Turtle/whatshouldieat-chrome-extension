    $(function() {
        var recipe;
        
        var CACHE_KEY = 'cached_recipes';
        var TIMESTAMP_KEY = 'cached_recipes_ts';
        var DAYS_UNTIL_INVALIDATION = 1;

        $(function() {
            fetchRecipe();
        });

        function fetchRecipe() {
            var cachedRecipes = fetchCache(CACHE_KEY);
            var cacheTimestamp = new Date(JSON.parse(fetchCache(TIMESTAMP_KEY)));

            // check if cache is older than specified limit
            var cacheIsInvalid = (new Date(new Date().getTime() - cacheTimestamp.getTime()).getUTCDate() - 1) > DAYS_UNTIL_INVALIDATION;

            if (cachedRecipes && !cacheIsInvalid) {
                recipe = fetchRandomRecipeFrom(JSON.parse(cachedRecipes).items);

                setRecipe();
            }
            else {
                createContentfulClient().getEntries({
                    'content_type': 'recipe'
                }).then((entries) => {
                    cache(CACHE_KEY, entries);
                    cache(TIMESTAMP_KEY, new Date());
                    recipe = fetchRandomRecipeFrom(entries.items);

                    setRecipe();
                });
            }
        }

        function setRecipe() {
            setBackground();
            setLogo();
            setRecipeName();
            setExecutionTime();
            setPortions();
            setLink(); 
        }

        function fetchCache(key) {
            return localStorage.getItem(key);
        }

        function cache(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }

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
            var quality = 100;
            var url = recipe.fields.image.fields.file.url + '?fm=jpg&w=1024&h=720&q=' + quality;

            $(".intro").css("background", "linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 42%,rgba(0,0,0,1) 81%,rgba(0,0,0,1) 99%), url(https:" + url + ") no-repeat fixed");
            $(".intro").css("background-size", "cover");
        }

        function setLogo() {
            $("#logo").attr("src", "https:" + recipe.fields.logo.fields.file.url);
        }

        function setRecipeName() {
            $("#name").text(recipe.fields.name);
        }

        function setExecutionTime() {
            $("#execution").text("temps d'exécution · " + recipe.fields.preparationTime);
        }

        function setPortions() {
            $("#portions").text(recipe.fields.portions);
        }

        function setLink() {
            $("#logo-link").attr("href", recipe.fields.blog);
            $("#link").attr("href", recipe.fields.blog);
        }
    });

