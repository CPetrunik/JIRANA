/* DO NOT USE
ALL CSS NOW COMES FROM THE CSS FOLDER
THIS IS LEFT AS A REFERENCE
*/





Handlebars.registerHelper('template', function (templateName, context) {
    return new Handlebars.SafeString(Handlebars.templates[templateName](this));
});

Handlebars.registerHelper('data', function (options) {
    return options.fn(stud.d[this]);
});

Handlebars.registerHelper('nameFormat',function(name){
    return name ? name.split(/[^a-zA-Z]+/g).join(' ').replace(/(?:^|\s)\S/g, function(a){return a.toUpperCase(); }) : "";
});

Handlebars.registerHelper('panelColor', function () {
    console.log(new Date(this.date).getTime());
   if(this.status == "Complete") {
       return 'success'; } //if asana is complete return grayish green
   else if(this.backlog == 1) {
       return 'default'; } //if asana is not complete but in backlog return blue
   
   else if((new Date(this.date).getTime()) < (new Date().getTime() - (new Date().getTime() % 86400000))){
       return 'danger'; } //if asana is not complete and in the frontlog return red orange
    else{
    return 'info';}
});

Handlebars.registerHelper('asanaComplete',function(){
    if(this.status == "Complete"){
        return new Handlebars.SafeString('<span class="glyphicon glyphicon-check" aria-hidden="true"></span>');
    }else{
        return new Handlebars.SafeString('<span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>');
    }
});


Handlebars.registerHelper('jiraLink', function () {
	return "https://jira2.workday.com/browse/" + this.index;
});

Handlebars.registerHelper('asanaLink', function () {
	return "https://app.asana.com/0/0/" + this.i + "/f";
});

var stud = {};
stud.c = {}; //config
stud.a = {}; //asana
stud.j = {}; //jira
stud.d = {}; //data
stud.i = ""; //index
// Stud Config

stud.c.p = {
    '5311864561448': {
        'k': 'rec'
    },
    'rec': {
        'n': 'Recruiting', // name 
        'p': '5311864561448', // asana project
        'b': '8367097254651', // backlog project
        'c': '' // jira component
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
        'c': '~', // commit
        'r': '~', // priority C:ritical B:locker M:ajor
        //  'r': '~', // review
        //  'q': '~', // QA
        's': '~', // status O:pen C:omplete 
        'l': [] // link
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
    resetProgress();
    stud.a.p = [];
    $.getJSON('https://app.asana.com/api/1.0/workspaces/5311864561437/projects?archived=false', function (data) {
        $.each(data.data, function (key, val) {
            stud.a.p.push(val.id);
        });
        incrementProgress();
        stud.a.u();
    });
    stud.j.u();

};

//=========
// Asana 
//=========
//stud.a = {};
// Asana Last Update Time 
stud.a.t = "'2014-10-21T00:00:00.000Z'";

// Asana Data Function
stud.a.u = function () {
    var u = {};
    u.r = [];
    u.t = stud.a.t;
    $.each(stud.a.p, function (key, val) {
        //        var project = val;
        u.r.push($.getJSON(
            [
                "https://app.asana.com/api/1.0/projects/",
                val,
                "/tasks?modified_since=",
                stud.a.t,
                "&opt_fields=name,assignee.name,tags.name,modified_at,completed,due_on,projects.name,notes"
            ].join(''),
            function (data) {
                $.each(data.data, function (key, val) {
                    var a = stud.g('a:' + val.id);
                    a['i'] = val.id;
                    a['n'] = val.name;
                    a['name'] = val.name;
                    a['u'] = (val.assignee !== null ? val.assignee.name.toLowerCase().replace(/ +/g, ".") : null);
                    a['user'] = (val.assignee !== null ? val.assignee.name.toLowerCase().replace(/ +/g, ".") : null);
                    a['status'] = val.completed ? "Complete" : "Incomplete";
                    a['date'] = val.due_on;
                    a['desc'] = val.notes;
                    a['module'] = val.projects[0].name;
                    a['backlog'] = val.projects[0].name !== null ? val.projects[0].name.indexOf('Backlog') > -1 : false;
                    a['modified'] = new Date(val.modified_at).getTime();
                    a['l'] = [];
                    $.each(val.tags, function (key, val) {
                        if (val.name.toLowerCase().match(/^[a-z]+[\-][0-9]+$/)) {
                            if($.inArray(val.name.toUpperCase(),a['l']) == -1){
                               a['l'].push(val.name.toUpperCase());
                               }
                            var jira = stud.g('j:' + val.name.toUpperCase());
                            if($.inArray('a:' + a['i'], jira.l) === -1){ 
                                 jira.l.push('a:' + a['i']);
                            }
                            jira['i'] = jira['index'] = val.name.toUpperCase();
                        }
                    });
                    u.t = [val.modified_at, u.t].sort()[1];
                });
            }
        ));
    });
    // On Update Complete
    $.when.apply($, u.r).then(function () {
        console.log('Asana Querys Complete' + u.t);
        stud.a.t = u.t;
        index_search();
        incrementProgress();
    });
};

function index_search() {
    var i = "";
    var number = 0;
    $.each(stud.d, function (key, val) {
        if (val.n.slice(-1) != ":" && ((val.n + " " + val.u).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').match(/[a-z0-9]+/g))) {
            i = i + "[" + key + String.fromCharCode(0x5c) + (val.n + " " + val.u).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').match(/[a-z0-9]+/g).join("+") + "]";
        }
    });
    stud.i = i;
     chrome.storage.local.set({
         "i": stud.i
     });
    chrome.storage.local.set({
            "d": stud.d
        });
}

stud.a.r = function (p, t) {
    return;
};

// Asana Get Function
stud.a.g = function () {

};




//=========
// Jira
//=========
stud.j = {};

stud.j.p = ['STU'];
stud.j.u = function () {
    $.getJSON(
        [
            'https://jira2.workday.com/rest/api/2/search?jql=',
            'project%20%3D%20STU%20AND%20updated%20>%20"2014-11-24%2018%3A05"', //JQL REQUEST
            '&fields=',
            'key,customfield_10213,customfield_10306,assignee,issuetype,status,summary,updated,fixVersions,comment', // FIELDS
            '&maxResults=3000'
        ].join(''),
        function (data) {
            $.each(data.issues, function (key, val) {
                var j = stud.g('j:' + val.key);
                j['i'] = val.key;
                j['index'] = val.key;                    
                j['n'] = val.fields.summary;
                j['status'] = val.fields.status.name;
                j['u'] = val.fields.assignee.name;
                j['name'] = val.fields.summary;
                j['user']= val.fields.assignee.name;
                j['type']= val.fields.issuetype.name;
                j['verifier'] = val.fields.customfield_10213 != null ? val.fields.customfield_10213.name : null;
                j['toggle']= val.fields.customfield_10306 != null ? val.fields.customfield_10306[0] : null;
                j['fix']= val.fields.fixVersions[0] != null ? val.fields.fixVersions[0].name : null;
                j['modified'] = new Date(val.fields.updated).getTime();
                j['updated']= val.fields.updated;
                j['comments'] = val.fields.comment.comments[0] != null ? [{'user': val.fields.comment.comments[0].author.name,'comment': val.fields.comment.comments[0].body,}] : null;
            });
            index_search();
            incrementProgress();
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
            incrementProgress();
        }));
    $.getJSON('https://app.asana.com/api/1.0/workspaces/5311864561437/projects?archived=false',
        function (data) {
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
            });
            incrementProgress();
        });
}

function search(str) {
    if (str.toLowerCase().replace(/[^a-z0-9]/g, '').length > 2) {
        var words = str.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').match(/[a-z0-9]+/g);
        var query = "\\x5b[aj][:][a-zA-Z0-9-]+\\x5c";
        $.each(words, function (key, val) {
            query += "(?=[a-z0-9+]*" + val.match(/[a-z0-9]/g).join("[a-z0-9]*") + "[a-z0-9+]*)";
        });
        query += "[a-z0-9+]*\\x5d";
        
        var results = stud.i.match(new RegExp(query, "g"));
        var map = {};
        var links = [];
        $.each(results, function(key,val){
            val = val.replace(/\x5b/g, '').replace(/\x5c[a-z0-9+]*\x5d/g, '');
            if(val.charAt(0) === "j"){
                if(!map[val]){
                    map[val] = {j:val, a:[]};
                    links.push(map[val]);
                }
            }else if(val.charAt(0) === "a"){
                $.each(stud.d[val].l,function(key,jval){
                    if(!map['j:' + jval]){
                        map['j:' + jval] = {j: 'j:' + jval, a:[val]};
                        links.push(map['j:' + jval]);
                    }else{
                        map['j:' + jval].a.push(val);
                    }
                });
                if(stud.d[val].l.length === 0){
                    links.push({j: '', a:[val]});   
                }
            }
        });
        
        links = links.sort(function(a,b){
            var adates = [];
            if(a.j!== "" && stud.d[a.j].modified){
                adates.push(stud.d[a.j].modified);
            }
            $.each(a.a, function(key,val){
                adates.push(stud.d[val].modified);
            });
            adates = adates.sort();
            
            var bdates = [];
            if(b.j!== "" && stud.d[b.j].modified){
                bdates.push(stud.d[b.j].modified);
            }
            $.each(b.a, function(key,val){
                bdates.push(stud.d[val].modified);
            });
            bdates = bdates.sort();
            return - (adates[adates.length-1] - bdates[bdates.length-1]);
        });

        $.each(links,function(key,val){
            var adates = [];
            if(val.j!== "" && stud.d[val.j].modified){
                adates.push(stud.d[val.j].modified);
            }
            $.each(val.a, function(key,val){
        
                adates.push(stud.d[val].modified);
            });
        });
        return links;
        var results = "";
        return stud.i.match(new RegExp(query, "g")) || [];
    }
    return [];
}

$(document).ready(function () {
    chrome.storage.local.get("d", function (data) {
        if (data.d) {
            stud.d = data.d;
        }
    });
    chrome.storage.local.get("i", function (data) {
        if (data.i) {
            stud.i = data.i;
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
    $("#reindex").click(

        stud.u);
    $(".dropdown-menu-replace li a").click(function () {
        var selText = $(this).text();
        $(this).parents('.dropdown').children('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    });
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
    $("#search").on("keyup", function () {
        transitionToList();
        var result;
        chrome.storage.local.set({
            "s": $("#search").val()
        });
        $('a[href="#sdd-main"]').tab('show');
        result = search($("#search").val());
        $("#search-out").html(Handlebars.templates.search(result));
        $(".searchResult").click(function (e) {
            var task_id = $(this).find(".jira_id").first().val() || $(this).find(".asana_id").first().val();
            transitionToItem(task_id);
        });
    });
});

function resetProgress()
{
    var progressBar = $("#reindexProgress");
    console.log(progressBar);
    progressBar.attr("data-percentage", "0");
    progressBar.css('width', '0%');
    progressBar.addClass("active");
};

function incrementProgress()
{
    var progressBar = $("#reindexProgress");
    var percentage = progressBar.attr("data-percentage");
    percentage += 50;
    progressBar.attr("data-percentage", percentage);
    progressBar.css('width', (percentage)+'%');

    if (percentage >= 100)
    {
        progressBar.removeClass("active");
    }

};

// [a:432423/u:ben+mccurdy/p:1/n:
// [j:fdsfds/u:ben+mccurdy/p:n:
