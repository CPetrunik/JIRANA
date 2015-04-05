//====================
// Search
//====================
/*jslint browser: true , unparam:true*/
/*global $ */
var stud = window.stud || {};
stud.search = (function () {
    'use strict';
    var config = {
        'default': ['i', 'n', 'a'],
        'n': 'fuzzy',
        'i': 'exact',
        'a': 'fuzzy',
        'm': 'exact'
    };

    function fuzzy(fields, words) {
        console.log("fuzzy")
        console.log(fields);
        console.log(words);
        var conditions = [];
        $.each(words, function (key, word) {
            conditions.push([
                '(["][a-z]+["][:]["][a-z0-9+]+["][,])*["](([',
                fields.join("])|(["),
                ']))["][:]["]',
                "([a-z0-9]+[+])*[a-z0-9]*",
                word.match(/([a-z])|([0-9]+)/g).join("[a-z0-9]*"),
                "[a-z0-9]*([+][a-z0-9]+)*",
                '["]'
            ].join(""));
        });
        return "((?=" + conditions.join(")(?=") + "))";
    }

    function exact(fields, words) {
        console.log("exact")
        console.log(fields);
        console.log(words);
        return [
            '(?=(["][a-z]+["][:]["][a-z0-9+]+["][,])*["]((',
            fields.join(")|("),
            '))["][:]["]',
            words.join("[+]"),
            '["])'
        ].join("");
    }

    function condition(prefix, words) {
        var prefixes = [],
            conditions = [];
        if (prefix === "default") {
            prefixes = [];
            $.each(config['default'], function (key, val) {
                if (config[val] === "fuzzy") {
                    prefixes.push(val);
                }
            });
            conditions.push(fuzzy(prefixes, words));
            prefixes = [];
            $.each(config['default'], function (key, val) {
                if (config[val] === "exact") {
                    prefixes.push(val);
                }
            });
            conditions.push(fuzzy(prefixes, words));
        } else if (config[prefix] === "fuzzy") {
            conditions.push(fuzzy([prefix], words));
        } else if (config[prefix] === "exact") {
            conditions.push(exact([prefix], words));
        }
        return "(" + conditions.join("|") + ")";
    }

    function search(str) {
        var parameters, prefix, conditions, words;
        parameters = str.toLowerCase().match(/[a-z0-9]+:?/g);
        prefix = "default";
        conditions = [];
        words = [];

        $.each(parameters, function (key, parameter) {
            if (parameter.match(/([a-z0-9]+:)/)) {
                console.log(prefix);
                if(words.length > 0){
                conditions.push(condition(prefix, words));
                }
                prefix = parameter.match(/([a-z0-9]+)/g)[0];
                console.log(prefix);
                words = [];
            } else {
                words.push(parameter);
            }
        });
        console.log(prefix);
        conditions.push(condition(prefix, words));
        console.log(prefix);

        return new RegExp([
            '["][a-z0-9]+[$][a-z0-9]+["]', // key
            '[:]', // separator
            '[{]', // object start
            conditions.join(""),
            '((["][a-z]+["][:]["][a-z0-9+]+["][,])*', // Fields
            '(["][a-z]+["][:]["][a-z0-9+]+["]))?', // End Field
            '[}]' // object end
        ].join(""), "g");       
    }

    return {
        f:fuzzy,
        e:exact,
        c:condition,
        search: search
    };
}());