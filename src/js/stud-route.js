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
        function save(){
            stud.settings.put_auth("a", $("#asana-auth").val());
            stud.settings.put_auth("j", $("#jira-auth").val());
            stud.settings.put_auth("s", $("#slack-auth").val());
            $(".module-row").each(function(){
                stud.settings.put_module({
                    "type":$(this).find(".setting-module-type").val(),
                    "prefix":$(this).find(".setting-module-prefix").val(),
                    "name":$(this).find(".setting-module-name").val(),
                    "project":$(this).find(".setting-module-project").val(),
                    "filter":$(this).find(".setting-module-filter").val()  
                });    
            });
        }
        $('a[href="#/c"]').parent().addClass('active');

        $("#content").fadeOut(200, function done(){
            
            $("#content").html(stud.template.build['stud-settings-page']()).fadeIn(200, function() {
                $("#content :input").change(save);
                $("#content #module-add").click(function (){
                
                    //console.log($(".module-row:last"));
                    //console.log(stud.template.build['stud-settings-module-row']());
                    $(".module-row:last").after(stud.template.build['stud-settings-module-row']());
                    $("#content :input").change(save);
                    console.log("ADD CLICKED");
                });
            });

        });

    }

    function route_asana(id) {

    }

    function route_jira(id) {

    }

    function route_log(){
        $(".nav-tab").parent().removeClass("active");
        $("#content").fadeOut(200, function done(){
            $("#content").html("<div class='content'>LOG STUB</div>").fadeIn(200);

        });
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
        '/a/:id': route_asana,
        '/l': route_log
    };

    router = new Router(routes);

    function start() {
        router.init("m");
        chrome.tabs.getCurrent(function(data){
            if(data){
                $("body").css({"overflow-y":"scroll"});
                $("#content").css({"height":"auto"});   
            }
            else{
                $("body").css({"zoom":"reset"}); 
            }
        });

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
            query = query.match(/^[d][+]/g) ? query.substr(2) : query;
            if (query.length > 5) {
                router.setRoute("s/" + query);
            }
        });
        
        
    }
    function refresh (){
        var route = router.getRoute().join("/");
        router.setRoute("");
        router.setRoute(route);
    }
    

    return {
        refresh:refresh,
        start: start
    };
}());
