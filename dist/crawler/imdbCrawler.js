"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const cheerio = require("cheerio");
const moment = require("moment");
function getIMDBMovieInfo(movie) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const imdbID = yield getIMDBSuggestId(movie);
            if (!imdbID) {
                return null;
            }
            const imdbRating = yield getIMDBRating(imdbID);
            return {
                imdbID,
                imdbRating
            };
        }
        catch (e) {
            console.error(e);
            return null;
        }
    });
}
exports.getIMDBMovieInfo = getIMDBMovieInfo;
function getIMDBSuggestId({ englishTitle, releaseDate }) {
    return __awaiter(this, void 0, void 0, function* () {
        const imdbSuggestJsonUrl = getIMDBSuggestJsonUrl(englishTitle);
        console.log(imdbSuggestJsonUrl);
        const response = yield fetch(imdbSuggestJsonUrl);
        const suggestions = yield response.json();
        if (suggestions && suggestions.d && suggestions.d.length) {
            const releaseYear = moment(releaseDate).year();
            const correctMovie = suggestions.d.find(({ y, l }) => (similarity(l, englishTitle) > 0.8 || y === releaseYear));
            if (correctMovie && correctMovie.id) {
                return correctMovie.id;
            }
        }
        console.log(`could not find suggest id at ${imdbSuggestJsonUrl}`);
        return null;
    });
}
// For example, the suggestionUrl of the movie "girl's revenge" is https://v2.sg.media-imdb.com/suggestion/g/girls_revenge.json
function getIMDBSuggestJsonUrl(englishTitle) {
    const jsonName = englishTitle.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, "_").substr(0, 20);
    return `https://v2.sg.media-imdb.com/suggestion/${jsonName.charAt(0)}/${jsonName}.json`;
}
const imdbMobileMovieUrl = 'http://m.imdb.com/title/';
function getIMDBRating(imdbID) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!imdbID) {
            return null;
        }
        const response = yield fetch(`${imdbMobileMovieUrl + imdbID}`);
        const html = yield response.text();
        const $ = cheerio.load(html);
        let rating = "";
        let ratingWrapper = $('#ratings-bar span:nth-child(2)')[0];
        if (ratingWrapper && ratingWrapper.childNodes && ratingWrapper.childNodes[0]) {
            rating = ratingWrapper.childNodes[0].nodeValue;
        }
        return rating;
    });
}
exports.getIMDBRating = getIMDBRating;
function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
//# sourceMappingURL=imdbCrawler.js.map