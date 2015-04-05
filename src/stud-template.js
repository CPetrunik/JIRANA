//============
// Handlebars
//============
/*global Handlebars*/
var stud = stud || {};
stud.template = (function () {
    'use strict';
    Handlebars.registerHelper('template', function (templateName, context) {
        return new Handlebars.SafeString(Handlebars.templates[templateName](this));
    });

    Handlebars.registerHelper('data', function (options) {
        return options.fn(stud.d[this]);
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
            return new Handlebars.SafeString('<span class="glyphicon glyphicon-check" aria-hidden="true"></span>');
        } else {
            return new Handlebars.SafeString('<span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>');
        }
    });
    
    Handlebars.registerHelper('jiraLink', function () {
        return "https://jira2.workday.com/browse/" + this.index;
    });

    Handlebars.registerHelper('asanaLink', function () {
        return "https://app.asana.com/0/0/" + this.i + "/f";
    });
}());