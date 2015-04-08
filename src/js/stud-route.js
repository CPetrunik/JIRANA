//====================
// Route
//====================
/*global $, Router */
var stud = stud || {};
stud.route = (function () {
    'use strict';
    var router, routes;

    function route_search() {

    }

    function route_config() {

    }

    function route_asana(id) {

    }

    function route_jira(id) {

    }

    routes = {
        '/s/:query': route_search,
        '/c': route_config,
        '/j/:id': route_jira,
        '/a/:id': route_asana
    };

    router = new Router(routes);

    function start() {
        router.init();
    }

    return {
        start: start
    };
}());
