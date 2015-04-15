//====================
// Route
//====================
/*global $, Router */
var stud = stud || {};
stud.route = (function () {
    'use strict';
    var router, routes;

    function route_search(query) {
        var next = "p";
        var prefix;
        var data = {};
        $.each(query.match(/([a-z0-9]+)|([\+\-])/g), function (key, val) {
            if (val === "+") {
                next = "p";
            } else if (val === "-") {
                next = "w"
            } else if (next === "p") {
                prefix = val;
            } else if (next === "w") {
                data[prefix] = data[prefix] || [];
                data[prefix].push(val);
            }
        });
        //console.log();

        $("#content").fadeOut(200, function done(){
            $("#content").html(stud.template.build['stud-search-page']({
                results: stud.search.search(data)
            })).fadeIn(200);

        });

    }

    function route_config() {

        $('a[href="#/c"]').parent().addClass('active');

        $("#content").fadeOut(200, function done(){
            $("#content").html(stud.template.build['stud-settings-page']()).fadeIn(200);

        });

    }

    function route_asana(id) {

    }

    function route_jira(id) {

    }

    function route_main() {
        $(".nav-tab").parent().removeClass("active");
        $("#content").fadeOut(200, function done(){
            $("#content").html("<div class='content'>hello</div>").fadeIn(200);

        });
    }

    routes = {
        '/m': route_main,
        '/s': {
            '/([a-z0-9-\+]+)': route_search
        },
        '/c': route_config,
        '/j/:id': route_jira,
        '/a/:id': route_asana
    };

    router = new Router(routes);

    function start() {
        router.init("m");
        $("#search").keyup(function () {
            var query, parameters;
            query = "d"
            parameters = $("#search").val().toLowerCase().match(/[a-z0-9]+:?/g) || [];
            $.each(parameters, function (k, v) {
                if (v.match(/[a-z0-9]+(?=[:])/g)) {
                    query = query + "+" + v.match(/[a-z0-9]+(?=[:])/g)[0];
                } else {
                    query = query + "-" + v.match(/[a-z0-9]+/g)[0];
                }
            });
            if (query.length > 5) {
                router.setRoute("s/" + query);
            }
        });
    }

    return {
        start: start
    };
}());
