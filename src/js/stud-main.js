//====================
// Main
//====================
/*jslint browser: true , unparam:true*/
/*global $, stud */
var stud = window.stud || {};
stud.main = true;

$(function () {
    'use strict';
    stud.storage.start();
    stud.asana.start();
    stud.jira.start();
    stud.route.start();
    stud.search.start();
    stud.slack.start();
    stud.template.start();
    stud.log.start();
});
