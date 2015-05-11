//=======
// Asana
//=======
/*global chrome, $ */
var stud = stud || {};
stud.asana = (function () {
    'use strict';
    var ready = $.Deferred(),
        event = {};

    function get(id) {
        return stud.storage.get('a', id);
    }

    function put(id, data) {

    }

    function getProjectListRequest(workspace) {
        return $.getJSON([
            "https://app.asana.com/api/1.0/workspaces/",
            workspace,
            "/projects?archived=false"
        ].join(""));
    }

    function processProjectListRequest(data) {
        var projects = [];
        $.each(data.data, function (key, val) {
            projects.push(val.id);
        });
        return projects;
    }

    function getTaskListRequest(project, update) {
        //console.log(update);
        update[project] = update[project] || (new Date().getTime() - 2592000000);
        //console.log(new Date(update[project]));
        return $.getJSON([
            "https://app.asana.com/api/1.0/projects/",
            project,
            "/tasks?modified_since=",
            new Date(update[project]).toISOString(),
            "&opt_fields=",
            [
                "name",
                "assignee.name",
                "tags.name",
                "modified_at",
                "completed",
                "due_on",
                "projects.name",
                "notes"
            ].join(",")
        ].join(''));
    }

    function processTaskListRequest(data, update) {
        //console.log(data);
        var count = 0;
        var pj = "";
        $.each(data.data, function (key, val) {
            var links = [];
            $.each(val.tags, function (key, val) {
                if (val.name.toLowerCase().match(/^[a-z]+[\-][0-9]+$/)) {
                    links.push(val.name.toUpperCase());
                }
            });
            if (val.name.charAt(val.name.length - 1) !== ":") {
                var project = val.projects[0].id;
                var modified = new Date(val.modified_at).getTime();
                count = count + 1;
                stud.storage.put("a", val.id, {
                    "index": val.id,
                    "name": val.name,
                    "assignee": val.assignee ? val.assignee.name : undefined,
                    "status": val.completed ? "Complete" : "Incomplete",
                    "due": new Date(val.due_on).getTime(),
                    "modified": new Date(val.modified_at).getTime(),
                    "description": val.notes,
                    "module": val.projects[0].name,
                    "links": links
                });
                pj = val.projects[0].name;
                if(modified > update[project]){
                    update[project] = modified;
                }
            }
        });
        console.log(count);
        if(count > 0){
            stud.log.write( "Asana: " + count + " tasks in (" + pj + ") updated");
        }
        //console.log(data);
    }

    function update() {
        console.log("Asana: Updating");
        //console.log(stud.storage.data());
        var last_update = stud.storage.get("g", "asana_update");
        //console.log("val" + last_update.value);
        last_update.value = last_update.value || {};
        return $.when(ready).then(function () {
            return getProjectListRequest("5311864561437");
        }).then(function (data) {
            return processProjectListRequest(data);
        }).then(function (projectList) {
            var requests = [];
            $.each(projectList, function (key, project) {
                requests.push(getTaskListRequest(project, last_update.value));
            });
            return $.when.apply($, requests);
        }).then(function () {
            var status = 1, data = 0;
            if (arguments[status] === "success") {
                processTaskListRequest(arguments[data], last_update.value);
            } else {
                $.each(arguments, function (key, args) {
                    processTaskListRequest(args[0], last_update.value);
                });
            }
            stud.storage.put("g", "asana_update", last_update);
            stud.storage.persist();
            stud.log.write("Asana: Update Persisted");
            stud.storage.persist();
        });
    }

    function start() {
        $.when(stud.storage.ready, stud.log.ready).done(update);
        ready.resolve();
    }

    return {
        get: get,
        update: update,
        start: start,
        ready: ready
    };
}());
