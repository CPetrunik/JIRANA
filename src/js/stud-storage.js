//====================
// Storage
//====================
/*global $ */
var stud = stud || {};
stud.storage = (function () {
    'use strict';
    var storage_event = {},
        storage_data = {},
        storage_class = {
            "j": {
                "index": "index_data",
                "data": "data"
            },
            "a": {
                "index": "index_data",
                "data": "data"
            },
            "g": {
                "general": "general"
            }
        },
        storage_group = {
            "index": [
                "i",
                "n",
                "a",
                "m"
            ],
            "index_data": [
                "index",
                "name",
                "assignee",
                "module"
            ],
            "data": [
                "verifier",
                "type",
                "status",
                "description",
                "comments",
                "backlog",
                "modified",
                "due",
                "toggle",
                "fix",
                "comments",
                "links"
            ],
            "general": [
                "value"
            ]
        };

    function copy(object) {
        return JSON.parse(JSON.stringify(object));
    }

    function put(cl, id, obj) {
        var key = cl + "$" + id;
        $.each(storage_class[cl], function (group, map) {
            var object = storage_data[group][key] || {};
            $.each(storage_group[map], function (index, field) {
                if (obj[field]) {
                    object[storage_group[group][index]] = obj[field];
                }
            });
            if (!$.isEmptyObject(object)) {
                storage_data[group][key] = object;
            }
        });
    }

    function get(cl, id) {

    }

    function start() {
        $.each(storage_class, function (name, data) {
            $.each(data, function (group, map) {
                storage_data[group] = {};
            });
        });
    }

    function index() {
        return JSON.stringify(storage_data.index, function (key, val) {
            if (storage_group.index.indexOf(key) > -1) {
                return (val.toString()).match(/[a-zA-Z0-9]+/g).join("+");
            } else {
                return val;
            }
        }).toLowerCase();
    }

    function ready() {

    }

    function persist() {

    }

    return {
        index: index,
        put: put,
        get: get,
        start: start,
        ready: ready
    };
}());
