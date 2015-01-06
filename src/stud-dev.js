var stud = {};
stud.c = {}; //config
stud.a = {}; //asana
stud.j = {}; //jira
stud.d = {}; //data
stud.i = ""; //index
// Stud Config

stud.c.p = {
    '5311864561448' :{
        'k': 'rec'
    },
    'rec':{
        'n': 'Recruiting', // name 
        'p': '5311864561448',// asana project
        'b': '8367097254651',// backlog project
        'c': ''// jira component
    }
}; // projects
stud.c.s; // searches
stud.c.u; // users

stud.g = function (i) {
    return stud.d[i] || (stud.d[i] = {
        'n': '~', // name
        'u': '~', // user
        'm': '~', // module
        'p': '~', // patch
        'b': '~', // backlog
        'r': '~', // review
        'q': '~', // QA
        'c': '~', // complete
        'l': []   // link     
    });
};
// backlog -> open -> development -> qa -> complete                     
// rec - recruiting
// adm - admissions
// cur - curriculum
// eng - engagement
// fnd - foundation
// mnm - matchmerge
// int - integrations 
// adv - advising   
// aid - financial aid
// fin - student financials 
// arc - architecture
                         
                         
                         
 /*                        
d:efault - i | u n
i:dentifier - text exact 1
u:ser - text fuzzy *
n:ame - text fuzzy *
p:roject - text fuzzy 1 

// derived
p:atch - bool y/n number
r:eview - bool
c:omplete - bool
b:acklog - bool
q:a - bool 
d:ue p t w n                     
*/

stud.u = function () {
    //stud.j.p = ['STU'];
    //stud.j.u();
    stud.a.p = [];
    $.getJSON('https://app.asana.com/api/1.0/workspaces/5311864561437/projects?archived=false', function (data) {
        $.each(data.data, function (key, val) {
            stud.a.p.push(val.id);
        });
        stud.a.u();
    });
};

//=========
// Asana 
//=========
//stud.a = {};
// Asana Last Update Time 
stud.a.l = "'2014-10-21T00:00:00.000Z'";

// Asana Data Function
stud.a.u = function () {
    var u = {};
    u.r = [];
    u.t = stud.a.t;
    $.each(stud.a.p, function (key, val) {
        u.r.push($.getJSON(
            [
                "https://app.asana.com/api/1.0/projects/",
                val,
                "/tasks?modified_since=",
                stud.a.l,
                "&opt_fields=name,assignee.name,tags.name,modified_at,completed"
            ].join(''),
            function (data) {
                $.each(data.data, function (key, val) {
                    var a = stud.g('a:' + val.id);
                    a['n'] = val.name;
                    a['u'] = (val.assignee !== null ? val.assignee.name.toLowerCase().replace(/ +/g,".") : null);
                    a['c'] = val.completed;
                    $.each(val.tags, function (key, val) {
                        if (val.name.toLowerCase().match(/^[a-z]+[\-][0-9]+$/)) {
                            a['l'].push(val.name.toUpperCase());
                        }
                    });
                    u.t = [val.modified_at, stud.a.l].sort()[1];
                });
            }
        ));
    });
    // On Update Complete
    $.when.apply($, u.r).then(function () {
        stud.a.t = u.time;
        $.each(stud.d, function (key, val) {
            if (val.n.slice(-1) != ":") {
                stud.i = stud.i + "[" + key + String.fromCharCode(0x5c) + (val.n+ " " + val.u).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').match(/[a-z0-9]+/g).join("+") + "]";
            }
        });
    });
};

stud.a.r = function (p, t) {
    return ;
};

// Asana Task Function
stud.a.t = function () {

};




//=========
// Jira
//=========
stud.j = {};
stud.j.p = [];
stud.j.u = function(){
    var u = {};
    u.r = [];
    u.t = stud.a.t;
    $.each(stud.a.p, function (key, val) {
        u.r.push($.getJSON(
            [
                "https://app.asana.com/api/1.0/projects/",
                val,
                "/tasks?modified_since=",
                stud.last.a,
                "&opt_fields=name,assignee.name,tags.name,modified_at,completed"
            ].join(''),
            function (data) {
                $.each(data.data, function (key, val) {
                    var j = stud.g('j:' + val.id);
                    j['n'] = val.name;
                    j['u'] = (val.assignee !== null ? val.assignee.name.toLowerCase().replace(/ +/g,".") : null);
                    j['c'] = val.completed;
                    u.t = [val.modified_at, stud.last.a].sort()[1];
                });
            }
        ));
    });
    // On Update Complete
    $.when.apply($, u.r).then(function () {
        stud.j.t = u.time;
    });

};
function update() {
    var u = {};

    u.requests = [];
    u.data = {};
    u.progress = 0;
    u.requests.push($.getJSON(
        [
            'https://jira.workday.com/rest/api/2/search?jql=',
            'project%20%3D%20STU%20AND%20updated%20>%20"2014-11-24%2018%3A05"', //JQL REQUEST
            '&fields=',
            'key,customfield_17400,status,summary,updated', // FIELDS
            '&maxResults=3000'
        ].join(''),
        function (data) {
            $.each(data.issues, function (key, val) {
                u.data['j:' + val.key] = {
                    'name': val.fields.summary
                };
            });
            //console.log(data);
        }));
    $.getJSON('https://app.asana.com/api/1.0/workspaces/5311864561437/projects?archived=false',
        function (data) {
            //console.log(data.data.length);
            $.each(data.data, function (key, val) {
                u.requests.push($.getJSON(
                [
                    "https://app.asana.com/api/1.0/projects/",
                    val.id,
                    "/tasks?modified_since=",
                    stud.last.a,
                    "&opt_fields=name,assignee,tags.name,modified_at,completed"
                ].join(''),
                    function (data) {
                        console.log(data.data);
                        $.each(data.data, function (key, val) {
                            stud.last.a = [val.modified_at, stud.last.a].sort()[1];
                            u.data['i:' + val.id] = {
                                'n': val.name,
                                'u': (val.assignee != null ? val.assignee.id : null),
                                'c': val.completed,
                                'j': (function () {
                                    var jiras = [];
                                    $.each(val.tags, function (key, val) {
                                        if (val.name.toLowerCase().match(/^[a-z]+[-][0-9]+$/)) {
                                            console.log('jira ' + val.name);
                                            jiras.push(val.name.toUpperCase());
                                        }
                                    });
                                    return jiras;
                                }())
                            };
                        });
                        u.progress++;
                        //added += data.data.length;
                        console.log(u.progress);
                    }
                ));
            });
            $.when.apply($, u.requests).then(function () {
                //console.log(u.data);
                //console.log(added);
            });

        });
    console.log('run');
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();


    $("#reindex").click(update);
    $('[data-toggle="tooltip"]').tooltip();
    $(".dropdown-menu-replace li a").click(function () {
        var selText = $(this).text();
        $(this).parents('.dropdown').children('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });
    stud.u();
    // Curent: get Asanas updated since 2014-10-21
    // Should: get Asanas updated IN LAST 30 DAYS 
//    var jira = "https://jira.workday.com/rest/api/2/search?jql=project%20%3D%20STU&fields=key,customfield_17400,status,summary&maxResults=100";
//    $.getJSON(jira, function (data) {
//        //console.log(data);
//    });
//    $.getJSON("https://app.asana.com/api/1.0/tasks/18090014935560?opt_fields=stories.", function (data) {
//        //console.log(data);
//    });
//    
//    //$.getJSON("https://app.asana.com/api/1.0/projects/5311864561448/tasks?modified_since=2014-10-21T00:00:00.000Z&opt_fields=name,assignee.name,tags", function (data) {
//        $.each(stud.d, function (key, val) {
//            if (val.name.slice(-1) != ":") {
//                stud.i = stud.i + "[a:" + val.n + String.fromCharCode(0x5c) + (val.n+ " " + val.u).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').match(/[a-z0-9]+/g).join("+") + "]";
////                asana[val.id] = {
////                    'name': val.name,
////                    'assignee': (val.assignee != null ? val.assignee.name : null),
////                    'tags': (function () {
////                        var tags = [];
////                        $.each(val.tags, function (key, val) {
////                            tags.push(val.id);
////                        });
////                        return tags;
////                    }())
////                };
//            }
//        });
//    //});

    // Fuzzy search on input change after 3 characters
    $("#search").on("change keyup", function () {
        if ($("#search").val().toLowerCase().replace(/[^a-z0-9]/g, '').length > 2) {
            $('a[href="#sdd-main"]').tab('show');
            var words = $("#search").val().toLowerCase().replace(/[^a-z0-9 ]/g, ' ').match(/[a-z0-9]+/g);
            var query = "\\x5b[aj][:][a-z0-9]+\\x5c";
            $.each(words, function (key, val) {
                query += "(?=[a-z0-9+]*" + val.match(/[a-z0-9]/g).join("[a-z0-9]*") + "[a-z0-9+]*)";
            });
            query += "[a-z0-9+]*\\x5d";

            //          ORDERED QUERY
            //            var query = "\\x5b[a-z0-9]+\\x5c([a-z0-9]+[+])*";
            //            $.each(words,function(key,val){
            //               
            //                query += "[a-z0-9]*" + val.match(/[a-z0-9]/g).join("[a-z0-9]*") + "[a-z0-9]*([+][a-z0-9]*)*";
            //            });
            //            query += "\\x5d";


            $("#search-out").html(function () {
                var result = stud.i.match(new RegExp(query, "g"));
                //console.log(result);
                //                result = result != null ? result.sort(function(a,b){
                //                    //console.log(a.replace(/\x5b[a-z0-9]+\x5c/g,"").replace(/\x5d/g,"").match(new RegExp($("#search").val().toLowerCase().match(/[a-z0-9]/g).join("[a-z0-9]*?"),''))[0] +" - "+ b.replace(/\x5b[a-z0-9]+\x5c/g,"").replace(/\x5d/g,"").match($("#search").val().toLowerCase().match(/[a-z0-9]/g).join("[a-z0-9]*"))[0]);
                //             
                //                    return a.replace(/\x5b[a-z0-9]+\x5c/g,"").replace(/\x5d/g,"").match($("#search").val().toLowerCase().match(/[a-z0-9]/g).join("[a-z0-9]*?"))[0].length - b.replace(/\x5b[a-z0-9]+\x5c/g,"").replace(/\x5d/g,"").match($("#search").val().toLowerCase().match(/[a-z0-9]/g).join("[a-z0-9]*?"))[0].length;
                //                }) : [];
                result = result != null ? result : [];
                var sout = '<table class="table table-hover"><tbody>';
                $.each(result, function (key, val) {
                    val = val.replace(/\x5b/g, '').replace(/\x5c[a-z0-9+]*\x5d/g, '');
                    sout += "<tr><td class='col-xs-8' style='overflow:hidden;text-overflow: ellipsis;'>" + stud.d[val].n + "</td><td class='col-xs-3' style='text-align:right;'>" + stud.d[val].u + "<span style='margin-left:10px;' class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span></td></tr>";
                });
                sout += '</tbody></table>';
                return sout;
            }());
        } else {
            $("#search-out").html("");
        }
    });
});
    
// [a:432423/u:ben+mccurdy/p:1/n:
// [j:fdsfds/u:ben+mccurdy/p:n: