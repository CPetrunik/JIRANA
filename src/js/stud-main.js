//====================
// Main
//====================
/*jslint browser: true , unparam:true*/
/*global $, stud */

$(function () {
    'use strict';
    stud.storage.start();
    stud.asana.start();
    stud.jira.start();
    stud.route.start();
    stud.search.start();
    stud.slack.start();
    stud.template.start();
});
