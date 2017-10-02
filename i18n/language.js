$(document).ready(function() {
    loadLanguage();
    setLanguageSwitches();
    setSelected();
    localize();
});


var LANGUAGE_CACHE_KEY = "lang";

function loadLanguage() {
    localStorage.getItem(LANGUAGE_CACHE_KEY) || detectBrowerLanguage();
}

function detectBrowerLanguage() {
    var browserLang = navigator.language || navigator.userLanguage;

    if (browserLang.startsWith('fr'))
        localStorage.setItem(LANGUAGE_CACHE_KEY, "Fr");
    else  
        localStorage.setItem(LANGUAGE_CACHE_KEY, "En");
}

function setLanguageSwitches() {
    $("#french").click(function() {
        localStorage.setItem(LANGUAGE_CACHE_KEY, "Fr");
        reload();
    });

    $("#english").click(function() {
        localStorage.setItem(LANGUAGE_CACHE_KEY, "En");
        reload();
    });
}

function setSelected() {
    var current = localStorage.getItem(LANGUAGE_CACHE_KEY);

    if (current === "Fr")
        $("#french").removeClass('unselected');

    if (current === "En")
        $("#english").removeClass('unselected');
}

function reload() {
    window.location.reload();
}

function localize() {
    $("[data-localize]").localize("messages", { language: localStorage.getItem(LANGUAGE_CACHE_KEY).toLowerCase() });
}