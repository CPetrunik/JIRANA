//====================
// Storage
//====================
/*global $, chrome*/
var stud = stud || {};
var errorr;
stud.storage = (function () {
    'use strict';
    var storage_ready = $.Deferred(),
        storage_event = {},
        storage_data,
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
            },
            "m": {
                "module": "module"
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
            ],
            "module": [
                "type",
                "prefix",
                "name",
                "project",
                "filter"
            ]
        };

    function copy(object) {
        return JSON.parse(JSON.stringify(object));
    }

    function put(cl, id, obj) {
        if(cl === "m"){console.log("modulepututut");}
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
        var obj = {};
        //console.log(cl + " " + id);
        //console.log(storage_data);
        $.each(storage_class[cl] || [], function (from, to) {
            //key index
            //val index_data
            $.each(storage_group[from], function (index) {
                //console.log(id);
                //console.log(storage_data[from][cl + "$" + id]);
                try {
                    obj[storage_group[to][index]] = storage_data[from][cl + "$" + id][storage_group[from][index]];
                } catch (e) {
                    stud.log.write("ERROR: Data may be corrupted: " + cl + "$" + id);
                }
            });
        });
        return obj;
    }

    function start() {
        chrome.runtime.getBackgroundPage(function (background) {

            if (background.data === false) {
                background.data = {};
                storage_data = background.data;
                $.each(storage_class, function (name, data) {
                    $.each(data, function (group, map) {
                        storage_data[group] = {};
                    });
                });
                $.each(storage_data, function (group) {
                    chrome.storage.local.get(group, function (data) {
                        storage_data[group] = data[group] || {};
                    });
                });
            } else {
                storage_data = background.data;
            }
            setTimeout(function () {
                //console.log("Storage: Ready");
                storage_ready.resolve();
            }, 500);
     
           
        });
    }
    
    function clear() {
        chrome.storage.local.clear(function () {
            chrome.runtime.getBackgroundPage(function (background) {
                background.data = false;
                start();
            });
        });
    }
    
    function del(cl, id){
    
    }
    
    function space() {
        chrome.storage.local.getBytesInUse(function (data) {
            stud.log.write("Storage: " + (data / 1000000) + " Mb");
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

    
    function persist() {
        chrome.storage.local.set(storage_data);
    }
    
    function log() {
        var l;
        try {
            l = storage_data.general.g$log.value;
        } catch (e) {
            put("g", "log", {value: [{ time: new Date().getTime(), message: "Log: Created"}]});
            l = storage_data.general.g$log.value;
        }
        return l;
    }
    
    function all(cl) {
        return Object.keys(storage_data[cl]);
    }

    return {
        index: index,
        put: put,
        get: get,
        start: start,
        ready: storage_ready,
        data: function () {return storage_data; },
        persist: persist,
        clear: clear,
        log: log,
        space: space,
        all: all
    };
}());
