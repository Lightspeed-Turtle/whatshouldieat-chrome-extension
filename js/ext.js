var CACHE_KEY = 'cached_recipes';
var TIMESTAMP_KEY = 'cached_recipes_ts';
var DAYS_UNTIL_INVALIDATION = 1;

$(document).ready(function() {
    fetchRecipe();
});

function fetchRecipe() {
    var entry_id = getParameterByName("entry");

    createContentfulClient().getEntries({
        'content_type': 'recipe'
    }).then((entries) => {
        currentRecipe = fetchRandomRecipeFrom(entries.items);

        if (entry_id) {
            currentRecipe = $.grep(entries.items, (e) => { return e.sys.id == entry_id })[0];
        }

        setRecipe();
    });
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

    return contentful.createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN
    });
}

function fetchRandomRecipeFrom(recipes) {
    return recipes[Math.floor((Math.random() * recipes.length))];
}

function setBackground() {
    var quality = 70;
    var url = currentRecipe.fields.image.fields.file.url + '?fm=jpg&w=2048&h=1440&q=' + quality;

    var cssToInsert = "linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 42%,rgba(0,0,0,1) 81%,rgba(0,0,0,1) 99%), url(https:" + url + ") no-repeat fixed";

    $(".intro").css("background", cssToInsert);
    $(".intro").css("background-size", "cover");
}

function setLogo() {
    $("#logo").attr("src", "https:" + currentRecipe.fields.logo.fields.file.url);
}

function setRecipeName() {
    $("#name").text(currentRecipe.fields.name);
}

function setExecutionTime() {
    $("#execution").text("temps d'exécution · " + currentRecipe.fields.preparationTime);
}

function setPortions() {
    $("#portions").text(currentRecipe.fields.portions);
}

function setLink() {
    $("#logo-link").attr("href", currentRecipe.fields.blog);
    $("#link").attr("href", currentRecipe.fields.blog);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}