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
const graphql_1 = require("graphql");
const cacheManager_1 = require("../data/cacheManager");
const QueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'query...',
    fields: () => ({
        allMovies: {
            type: new graphql_1.GraphQLList(MovieType),
            description: 'every movies',
            resolve: (root, args) => cacheManager_1.default.get("allMovies")
        },
        movie: {
            type: MovieType,
            description: "[deprecated] query single movie, please use movies(yahooIds) instead",
            args: {
                yahooId: { type: graphql_1.GraphQLInt }
            },
            resolve: (root, { yahooId, chineseTitle }) => __awaiter(this, void 0, void 0, function* () {
                const allMovies = cacheManager_1.default.get(cacheManager_1.default.All_MOVIES);
                return allMovies.find((movie) => { return movie.yahooId === yahooId; });
            }),
        },
        allMoviesNames: {
            type: new graphql_1.GraphQLList(autoCompleteType),
            description: 'Array of movie names, key:yahooId, value:chineseTitle or englishTitles',
            resolve: (root, args) => cacheManager_1.default.get(cacheManager_1.default.All_MOVIES_NAMES)
        },
        movies: {
            type: new graphql_1.GraphQLList(MovieType),
            args: {
                yahooIds: { type: new graphql_1.GraphQLList(graphql_1.GraphQLInt) }
            },
            resolve: (root, { yahooIds }) => __awaiter(this, void 0, void 0, function* () {
                let allMovies = cacheManager_1.default.get("allMovies");
                let result = [];
                allMovies.forEach((movie) => {
                    if (yahooIds.indexOf(movie.yahooId) !== -1) {
                        result.push(movie);
                    }
                });
                return result;
            }),
        },
        recentMovies: {
            type: new graphql_1.GraphQLList(MovieType),
            description: 'recent movies',
            resolve: (root, args) => cacheManager_1.default.get(cacheManager_1.default.RECENT_MOVIES)
        },
    }),
});
const MovieType = new graphql_1.GraphQLObjectType({
    name: 'Movie',
    description: '...',
    fields: () => ({
        yahooId: {
            type: graphql_1.GraphQLInt,
            description: 'yahoo movie id',
            resolve: obj => obj.yahooId,
        },
        posterUrl: {
            type: graphql_1.GraphQLString,
            description: 'poster image url',
            resolve: obj => obj.posterUrl,
        },
        summary: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.summary,
        },
        briefSummary: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.summary && obj.summary.length > 300 ? obj.summary.substr(0, 300) + '...' : obj.summary,
        },
        chineseTitle: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.chineseTitle,
        },
        englishTitle: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.englishTitle,
        },
        releaseDate: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.releaseDate,
        },
        type: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.type,
        },
        runTime: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.runTime,
        },
        director: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.director,
        },
        actor: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.actor,
        },
        launchCompany: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.launchCompany,
        },
        companyUrl: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.companyUrl,
        },
        goodRateArticles: {
            type: new graphql_1.GraphQLList(ArticleType),
            resolve: obj => obj.goodRateArticles,
        },
        normalRateArticles: {
            type: new graphql_1.GraphQLList(ArticleType),
            resolve: obj => obj.normalRateArticles,
        },
        badRateArticles: {
            type: new graphql_1.GraphQLList(ArticleType),
            resolve: obj => obj.badRateArticles,
        },
        otherArticles: {
            type: new graphql_1.GraphQLList(ArticleType),
            resolve: obj => obj.otherArticles,
        },
        relatedArticles: {
            type: new graphql_1.GraphQLList(ArticleType),
            resolve: obj => obj.relatedArticles,
        },
        imdbID: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.imdbID,
        },
        yahooRating: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.yahooRating,
        },
        imdbRating: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.imdbRating,
        },
        tomatoRating: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.tomatoRating,
        },
        tomatoURL: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.tomatoURL,
        },
        schedules: {
            type: new graphql_1.GraphQLList(scheduleType),
            resolve: (obj) => __awaiter(this, void 0, void 0, function* () {
                const moviesSchedules = cacheManager_1.default.get(cacheManager_1.default.MOVIES_SCHEDULES);
                return moviesSchedules.filter((schedule) => schedule.yahooId == obj.yahooId);
            }),
        }
    })
});
const ArticleType = new graphql_1.GraphQLObjectType({
    name: 'article',
    description: 'ptt articles',
    fields: () => ({
        title: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.title,
        },
        push: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.push,
        },
        url: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.url,
        },
        date: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.date,
        },
        author: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.author,
        },
    })
});
const autoCompleteType = new graphql_1.GraphQLObjectType({
    name: "autoCompleteType",
    fields: () => ({
        value: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.value,
        },
        text: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.text,
        },
    })
});
const scheduleType = new graphql_1.GraphQLObjectType({
    name: "scheduleType",
    fields: () => ({
        theaterName: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.theaterName,
        },
        yahooId: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.yahooId,
        },
        timesValues: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            resolve: obj => obj.timesValues,
        },
        timesStrings: {
            type: new graphql_1.GraphQLList(graphql_1.GraphQLString),
            resolve: obj => obj.timesStrings,
        },
        theaterExtension: {
            type: TheaterType,
            resolve: obj => obj.theaterExtension,
        }
    })
});
const TheaterType = new graphql_1.GraphQLObjectType({
    name: 'Theater',
    description: 'Theater in Taiwan with google location',
    fields: () => ({
        name: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.name,
        },
        address: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.address,
        },
        url: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.url,
        },
        phone: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.phone,
        },
        region: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.region,
        },
        location: {
            type: LocationType,
            resolve: obj => obj.location
        }
    })
});
const LocationType = new graphql_1.GraphQLObjectType({
    name: 'location',
    description: 'geo location from google',
    fields: () => ({
        lat: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.lat,
        },
        lng: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.lng,
        },
        place_id: {
            type: graphql_1.GraphQLString,
            resolve: obj => obj.place_id,
        },
    })
});
exports.default = new graphql_1.GraphQLSchema({
    query: QueryType,
});
//# sourceMappingURL=schema.js.map