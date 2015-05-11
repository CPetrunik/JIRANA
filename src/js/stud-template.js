//============
// Handlebars
//============
/*global $, Handlebars*/
var stud = window.stud || {};
stud.template = (function () {
    'use strict';
    Handlebars.partials = Handlebars.templates;
    Handlebars.registerHelper('template', function (templateName, context) {
        return new Handlebars.SafeString(Handlebars.templates[templateName](this));
    });

    Handlebars.registerHelper('group', function (context, sort, options) {
        var output = "", map = {}, groups = [];
        $.each(context, function (key, val) {
            var cl, id, links;
            cl = val.split("$")[0];
            id = val.split("$")[1];
            links = undefined;
            if (cl === "j") {
                if (!map[val]) {
                    map[val] = {j: id, a: []};
                    groups.push(map[val]);
                }
            } else if (cl === "a") {
                links = stud.asana.get(id).links || [];
                $.each(links, function (key, jira) {
                    if (!map['j$' + jira]) {
                        map['j$' + jira] = {j: jira, a: [id]};
                        groups.push(map['j$' + jira]);
                    } else {
                        map['j$' + jira].a.push(id);
                    }
                });

                if (links.length === 0) {
                    groups.push({j: '', a: [id]});
                }
            }
        });
        return options.fn({group: groups});
    });

    Handlebars.registerHelper('data', function (options) {
        return options.fn(stud.d[this]);
    });

    Handlebars.registerHelper('asana', function (options) {
        return options.fn(stud.asana.get(this));
    });
    
    Handlebars.registerHelper('jira', function (options) {
        return options.fn(stud.jira.get(this));
    });
    
    Handlebars.registerHelper('module', function (options) {
        return options.fn(stud.storage.get('m', this));
    });
    
    

    Handlebars.registerHelper('nameFormat', function (name) {
        /*jslint regexp:true*/
        return name ? name.split(/[^a-zA-Z]+/g).join(' ').replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        }) : "";
    });

    Handlebars.registerHelper('panelColor', function () {
        if (this.status === "Complete") {
            return 'success';
        } else if (this.backlog === 1) {//if asana is complete return grayish green

            return 'default';
        } else if ((new Date(this.date).getTime()) < (new Date().getTime() - (new Date().getTime() % 86400000))) {
         //if asana is not complete but in backlog return blue
            return 'danger';
        } else { //if asana is not complete and in the frontlog return red orange

            return 'info';
        }
    });

    Handlebars.registerHelper('asanaComplete', function () {
        if (this.status === "Complete") {
            return new Handlebars.SafeString('<span style="color:#999;" class="glyphicon glyphicon-check" aria-hidden="true"></span>');
        } else {
            return new Handlebars.SafeString('<span style="color:#999;" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>');
        }
    });
    
    Handlebars.registerHelper('formatDate', function (d){
     
    //get the month
        d = new Date(d);
    var month = d.getMonth();
    //get the day
    var day = d.getDate();
    //get the year
    var year = d.getFullYear();

    //pull the last two digits of the year
    year = year.toString().substr(2,2);

    //increate month by 1 since it is 0 indexed
    month = month + 1;
    //converts month to a string
    month = month + "";

    //if month is 1-9 pad right with a 0 for two digits
    if (month.length == 1)
    {
        month = "0" + month;
    }

    //convert day to string
    day = day + "";

    //if day is between 1-9 pad right with a 0 for two digits
    if (day.length == 1)
    {
        day = "0" + day;
    }

    //return the string "MMddyy"
    return month + "/" + day + "/" + year;

    });

    Handlebars.registerHelper('jiraLink', function () {
        return "https://jira2.workday.com/browse/" + this.index;
    });

    Handlebars.registerHelper('asanaLink', function () {
        return "https://app.asana.com/0/0/" + this.index + "/f";
    });

    function start() {

    }

    return {
        start: start,
        build: Handlebars.templates
    };
}());
